// Select categorias
const select_categories = document.getElementById("select_categories");

// Select autores
const select_glasses = document.getElementById("select_glasses");
const tablacocktail_body = document.getElementById("tablacocktail_body");

// Botón crear libro
const btn_allcocktails = document.getElementById("btn_allcocktails");

// Modal
const modal_container = document.getElementById("modal_container");

const btn_newcocktail = document.getElementById("btn_newcocktail");
const btn_modal_aniadir = document.getElementById("btn_modal_aniadir");
const btn_modal_cancelar = document.getElementById("btn_modal_cancelar");

const modal_input_title = document.getElementById("modal_input_title");
const modal_select_glass = document.getElementById("modal_select_glass");
const modal_select_category = document.getElementById("modal_select_category");
const modal_input_content = document.getElementById("modal_input_content");

// Crea una celda
const nuevaCelda = (dato) => {
    let nuevacelda = document.createElement("TD");
    nuevacelda.textContent = dato;
    return nuevacelda;
};

const getCocktels = async () => {

    tablacocktail_body.innerHTML = ""

    let response = await fetch("http://localhost:3000/apicocktails/cocktails/all");
    let respuesta = await response.json();

    respuesta.cocktails.forEach(cocktel => {
        let nuevafila = document.createElement("TR");
        nuevafila.appendChild(nuevaCelda(cocktel.nameCocktail));
        nuevafila.appendChild(nuevaCelda(cocktel.nameCategory));
        nuevafila.appendChild(nuevaCelda(cocktel.nameGlass));
        tablacocktail_body.appendChild(nuevafila);
    });
}

const getCocktelsVaso = async (select) => {

    tablacocktail_body.innerHTML = ""

    let response = await fetch("http://localhost:3000/apicocktails/glasses");
    let respuesta = await response.json();

    respuesta.glassesdata.forEach(cocktel => {

        let option_glasses = document.createElement("OPTION")
        option_glasses.value = cocktel.nameGlass
        option_glasses.textContent = cocktel.nameGlass
        select.appendChild(option_glasses)
    });
}

const getCocktelCategoria = async (select) => {

    tablacocktail_body.innerHTML = ""

    let response = await fetch("http://localhost:3000/apicocktails/categories");
    let respuesta = await response.json();

    respuesta.categoriesdata.forEach(cocktel => {

        let option__category = document.createElement("OPTION")
        option__category.value = cocktel.nameCategory
        option__category.textContent = cocktel.nameCategory
        select.appendChild(option__category)
    });
}

const filterCategoria = async (event) => {

    tablacocktail_body.innerHTML = ""

    let response = await fetch("http://localhost:3000/apicocktails/cocktails/categories/" + event.target.value);
    let respuesta = await response.json();

    respuesta.forEach(cocktel => {
        let nuevafila = document.createElement("TR");
        nuevafila.appendChild(nuevaCelda(cocktel.nameCocktail));
        nuevafila.appendChild(nuevaCelda(cocktel.nameCategory));
        nuevafila.appendChild(nuevaCelda(cocktel.nameGlass));
        tablacocktail_body.appendChild(nuevafila);
    });

};

select_categories.addEventListener("change", filterCategoria);

const filterVaso = async (event) => {

    tablacocktail_body.innerHTML = ""

    let response = await fetch("http://localhost:3000/apicocktails/cocktails/glasses/" + event.target.value);
    let respuesta = await response.json();

    respuesta.forEach(cocktel => {
        let nuevafila = document.createElement("TR");
        nuevafila.appendChild(nuevaCelda(cocktel.nameCocktail));
        nuevafila.appendChild(nuevaCelda(cocktel.nameCategory));
        nuevafila.appendChild(nuevaCelda(cocktel.nameGlass));
        tablacocktail_body.appendChild(nuevafila);
    });

};

select_glasses.addEventListener("change", filterVaso);

document.addEventListener("DOMContentLoaded", getCocktelCategoria(select_categories))
document.addEventListener("DOMContentLoaded", getCocktelsVaso(select_glasses))
document.addEventListener("DOMContentLoaded", getCocktelCategoria(modal_select_category))
document.addEventListener("DOMContentLoaded", getCocktelsVaso(modal_select_glass))
document.addEventListener("DOMContentLoaded", getCocktels)

btn_allcocktails.addEventListener("click", getCocktels)

const mostrarModal = () => {
    modal_container.classList.toggle("modal__mostrar")
}

btn_newcocktail.addEventListener("click", mostrarModal)
btn_modal_cancelar.addEventListener("click", mostrarModal)

btn_modal_aniadir.addEventListener("click", () =>{
    fetch("http://localhost:3000/apicocktails/cocktails/", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({        
        "nameCocktail": modal_input_title.value,
        "nameCategory": modal_select_category.value,
        "nameGlass": modal_select_glass.value
      })
      })
      .then(response => response.json())
      .catch(error => console.log(error));
  }) 