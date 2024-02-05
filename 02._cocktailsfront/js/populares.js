// Elementos
const cardscocktails = document.getElementById("cardscocktails");

let cocktails = []
let cocktail_carrito = {
  nombre: "",
  categoria: "",
  tipovaso: "",
  votos: "",
  imageCocktail: "",
};

const getCocktels = async () => {
  let response = await fetch("http://localhost:3000/apicocktails/cocktails/all");
  let respuesta = await response.json();

  respuesta.cocktails.forEach(cocktel => {

    let objCocktel = new Cocktail(cocktel.idCocktail, cocktel.nameCocktail, cocktel.videoCocktail, cocktel.nameCategory, cocktel.isAlcoholic, cocktel.nameGlass, cocktel.instructions, cocktel.imageCocktail, cocktel.ingredientsCocktail)
    cocktails.push(objCocktel)

  });

  showPopularCocktails(cocktails)
}

document.addEventListener("DOMContentLoaded", getCocktels)

let fragment = document.createDocumentFragment()

// Mostras 12 cocteles aleatorios al comienzo y no pueden estar repetidos
const showPopularCocktails = (cocktails) => {

  // FALTAN COSAS ESTA ES LA ESTRUCUTRA DE COMO SE MUESTRA UN COCKTAIL POPULAR

  for (let i = 0; i < 12; i++) {
    let rand = Math.floor(Math.random() * cocktails.length)
    //  Article para el card
    let cocktail = document.createElement("ARTICLE");
    cocktail.classList.add("cocktail");

    // !!!!!!!!!!!!!!!!!!PISTA: Me quedo con el id del cocktail para poder consultar posteriormente!!!!!!!!!!!!!!!!!!!!!
    cocktail.title = cocktails[rand].idCocktail;

    // Imagen del cocktail de fondo con efecto
    let mainimgcocktail = document.createElement("IMG");
    mainimgcocktail.classList.add("cocktail__main-img");
    mainimgcocktail.src = cocktails[rand].imageCocktail
    cocktail.appendChild(mainimgcocktail);

    // main
    let maincocktail = document.createElement("MAIN");
    maincocktail.classList.add("cocktail__content");

    // Nombre del cocktail
    // MAS PISTA!!!!! 
    let mainnamecocktail = document.createElement("H3");
    mainnamecocktail.classList.add("cocktail__title");
    // if (/* si cocktail esta en el localStorage */) {
    // mainnamecocktail.classList.add("cocktail__votes");
    // mainnamecocktail.textContent =
    // cocktails[rand].nameCocktail.substring(0, 18) +
    // " - " +
    ///* dato votos del localStorage, recuerda que tenemos el id del Cocktail guardado en el title  */ +
    // " votos";
    //} else {
    mainnamecocktail.textContent = cocktails[rand].nameCocktail.substring(0, 25);
    //}
    maincocktail.appendChild(mainnamecocktail);

    // header para maquetar imagen y textos del cocktail
    let headercocktail = document.createElement("HEADER");
    headercocktail.classList.add("cocktail__header");
    maincocktail.appendChild(headercocktail);

    // Div para maquetar textos del cocktail
    let divcocktail = document.createElement("DIV");
    divcocktail.classList.add("cocktail__div");
    headercocktail.appendChild(divcocktail);

    // Categoria del Cocktail
    let mainnamecategory = document.createElement("P");
    mainnamecategory.classList.add("cocktail__text");
    mainnamecategory.innerHTML = `<span class="cocktail__subtitle">Categoría: &nbsp</span>
   ${cocktails[rand].nameCategory.substring(0, 20)}`;
    divcocktail.appendChild(mainnamecategory);

    // Vaso del Cocktail
    let mainnameglass = document.createElement("P");
    mainnameglass.classList.add("cocktail__text");
    mainnameglass.innerHTML = `<span class="cocktail__subtitle">Tipo Vaso: &nbsp</span>
   ${cocktails[rand].nameGlass.substring(0, 15)}`;
    divcocktail.appendChild(mainnameglass);

    // Cocktail alcohólico o no
    let mainnamealcoholic = document.createElement("P");
    mainnamealcoholic.classList.add("cocktail__text");
    mainnamealcoholic.innerHTML = `<span class="cocktail__subtitle">Con Acohol: &nbsp</span>
    ${cocktails[rand].isAlcoholic}`;
    divcocktail.appendChild(mainnamealcoholic);

    // Imagen del cocktail
    let imgcocktail = document.createElement("IMG");
    imgcocktail.classList.add("cocktail__img");
    imgcocktail.src = cocktails[rand].imageCocktail;
    imgcocktail.alt = cocktails[rand].imageCocktail;
    headercocktail.appendChild(imgcocktail);

    // Instrucciones preparación Cocktail
    let maininstructions = document.createElement("P");
    maininstructions.classList.add(
      "cocktail__text",
      "cocktail__text--instructions"
    );
    maininstructions.innerHTML = `<div class="cocktail__subtitle cocktail__subtitle--header">Preparación</div>
  ${cocktails[rand].instructions.substring(0, 175)}`;
    maincocktail.appendChild(maininstructions);

    // Div ingredientes
    let divsingredientcocktail = document.createElement("DIV");
    divsingredientcocktail.classList.add(
      "cocktail__text",
      "cocktail__text--ingredients"
    );
    divsingredientcocktail.innerHTML = `<div class="cocktail__subtitle cocktail__subtitle--header">Ingredientes</div>`;
    maincocktail.appendChild(divsingredientcocktail);

    cocktails[rand].ingredientsCocktail.forEach((ingredient) => {
      let pingredient = document.createElement("P");
      pingredient.classList.add(
        "cocktail__text",
        "cocktail__text--ingredientsp"
      );
      pingredient.textContent = ingredient.measure + " - " + ingredient.name;
      divsingredientcocktail.appendChild(pingredient);
    });

    // Añadimos elementos
    cocktail.appendChild(maincocktail);
    fragment.appendChild(cocktail);
  }
  cardscocktails.appendChild(fragment);
};

const aniadirCarro = (event) => {
  let voto = 0
  let element = event.target
  if (element.tagName === "IMG") {
    cocktail_carrito.nombre = element.nextElementSibling.children[0].textContent;
    cocktail_carrito.categoria = element.nextElementSibling.children[1].children[0].children[0].textContent;
    cocktail_carrito.tipovaso = element.nextElementSibling.children[1].children[0].children[1].textContent;
    voto++
    cocktail_carrito.votos = voto;
    cocktail_carrito.imageCocktail = element.src;

    aniadirLocalStorage(cocktail_carrito);
  }
}

const aniadirLocalStorage = (cocktail_carrito) => {
  aux = JSON.parse(localStorage.getItem("coktails"))

  if (!aux) {
    aux = []
  }
  aux.push(cocktail_carrito)
  localStorage.setItem("coktails", JSON.stringify(aux))
}

document.addEventListener("click", aniadirCarro)