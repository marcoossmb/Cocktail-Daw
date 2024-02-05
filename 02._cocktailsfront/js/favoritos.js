const cardsfavorites = document.getElementById("cardsfavorites");
const favorite__btnvaciar = document.getElementById("favorite__btnvaciar");
const articlefavorites = document.getElementById("articlefavorites");

const cocktailsEnCarrito = JSON.parse(localStorage.getItem("coktails"));

const showFavorites = () => {
  // FALTAN COSAS ESTA ES LA ESTRUCUTRA DE COMO SE MUESTRA UN FAVORITO

  cocktailsEnCarrito.forEach((cocktel, index) => {

    // article
    let articlefavorites = document.createElement("ARTICLE");
    articlefavorites.classList.add("cardfavorite");

    // image
    let imagefavorites = document.createElement("IMG");
    imagefavorites.classList.add("favorite__img");
    imagefavorites.src = cocktel.imageCocktail;
    imagefavorites.alt = cocktel.imageCocktail;
    articlefavorites.appendChild(imagefavorites);

    // section
    let sectionfavorite = document.createElement("SECTION");
    sectionfavorite.classList.add("favorite__section");
    articlefavorites.appendChild(sectionfavorite);

    //  name
    let namefavorite = document.createElement("P");
    namefavorite.classList.add("favorite__text");
    namefavorite.textContent = "Nombre: ";
    namefavorite.innerHTML = `<span class="favorite__subtitle">Nombre: &nbsp</span>
    ${cocktel.nombre}`;
    sectionfavorite.appendChild(namefavorite);

    // Categoria
    let namecategory = document.createElement("P");
    namecategory.classList.add("favorite__text");
    namecategory.innerHTML = `<span class="favorite__subtitle">Categoría: &nbsp</span>
    ${cocktel.categoria}`;
    sectionfavorite.appendChild(namecategory);

    // Vaso
    let nameglass = document.createElement("P");
    nameglass.classList.add("favorite__text");
    nameglass.innerHTML = `<span class="favorite__subtitle">Tipo Vaso: &nbsp</span>
    ${cocktel.tipovaso}`;
    sectionfavorite.appendChild(nameglass);

    // Votos
    let votes = document.createElement("P");
    votes.classList.add("favorite__text");
    votes.innerHTML = `<span class="favorite__subtitle">Votos: &nbsp</span>
    ${cocktel.votos}`;
    sectionfavorite.appendChild(votes);

    //button
    let button = document.createElement("BUTTON");
    button.classList.add("favorite__btnborrar");

    button.textContent = "Eliminar";
    sectionfavorite.appendChild(button);

    cardsfavorites.appendChild(articlefavorites)

    button.addEventListener("click", () => borrarCocktel(index));
  });
}

document.addEventListener("DOMContentLoaded",showFavorites)

function borrarCocktel(index) {
  const cocktailsEnCarrito = JSON.parse(localStorage.getItem("coktails"));

  if (index >= 0 && index < cocktailsEnCarrito.length) {
    cocktailsEnCarrito.splice(index, 1);

    localStorage.setItem("coktails", JSON.stringify(cocktailsEnCarrito));

    location.reload()
  }
}

const borrarLocal = () => {
  localStorage.removeItem("coktails", JSON.stringify("cocktailsEnCarrito"));
  cardsfavorites.innerHTML=""
}

favorite__btnvaciar.addEventListener("click",borrarLocal)