const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const cocktailsdata = require("../data/json/cocktails.json");
const categoriesdata = require("../data/json/categories.json");
const ingredientsdata = require("../data/json/ingredients.json");
const glassesdata = require("../data/json/glasses.json");
const saveToDataBase = require("../data/data.js");

// Todas las categorias
router.get("/categories", (req, res) => res.send(categoriesdata));

// Todas los ingredientes
router.get("/ingredients", (req, res) => res.send(ingredientsdata));

// Todos los vasos
router.get("/glasses", (req, res) => res.send(glassesdata));

// Todos los cocktails
router.get("/cocktails/all", (req, res) => {
  res.send(cocktailsdata);
});

// Cocktail por id cocktails
router.get("/cocktails/:id", (req, res) => {
  const { id } = req.params;
  const onecocktail = cocktailsdata.cocktails.filter(
    (cocktail) => cocktail.idCocktail == id
  );
  res.send(onecocktail);
});

// Cocktails por nombre
router.get("/cocktails/name/:name", (req, res) => {
  const { name } = req.params;
  const cocktail = cocktailsdata.cocktails.filter((cocktail) =>
    cocktail.nameCocktail.includes(name)
  );
  res.send(cocktail);
});

// Cocktails por vasos  (cups)
router.get("/cocktails/glasses/:glass", (req, res) => {
  const { glass } = req.params;
  const cocktail = cocktailsdata.cocktails.filter(
    (cocktail) => cocktail.nameGlass.toLowerCase() === glass.toLowerCase()
  );
  res.send(cocktail);
});

// Cocktails por ingrediente
router.get("/cocktails/ingredients/:ingredientname", (req, res) => {
  const { ingredientname } = req.params;
  const cocktail = cocktailsdata.cocktails.filter((cocktail) => {
    const { ingredientsCocktail } = cocktail;

    // Comprobamos si alguno de los cockteles contiene el ingrediente
    const ingredients = ingredientsCocktail.some(
      (ingredient) =>
        ingredient.name.toLowerCase() === ingredientname.toLowerCase()
    );
    if (ingredients) return cocktail;
  });
  res.send(cocktail);
});

// Cocktails por categorias
router.get("/cocktails/categories/:category", (req, res) => {
  const { category } = req.params;
  let cocktailsresult = [];
  cocktailsresult = cocktailsdata.cocktails.filter((cocktail) => {
    return cocktail.nameCategory == category;
  });
  res.send(cocktailsresult);
});

// Cocktails con alcohol
router.get("/cocktails/alcoholic/:isalcoholic", (req, res) => {
  const { isalcoholic } = req.params;
  const cocktail = cocktailsdata.cocktails.filter(
    (cocktail) =>
      cocktail.isAlcoholic.toLowerCase() === isalcoholic.toLowerCase()
  );
  res.send(cocktail);
});

// Crear nuevo Cocktail
router.post("/cocktails", (req, res) => {
  let aux = {
    idCocktail: uuidv4(),
    ingredientsCocktail: [
      {
        measure: "1 oz ",
        name: "Southern Comfort",
      },
      {
        measure: "1 oz ",
        name: "Amaretto",
      },
      {
        measure: "1/2 oz ",
        name: "Sloe gin",
      },
      {
        measure: "1 dash ",
        name: "Lemon juice",
      },
    ],
    instructions:
      "Vierta todos los ingredientes (excepto el jugo de limón) sobre hielo en un vaso alto. Mezcla, añade un chorrito de zumo de limón y sirve.",
    isAlcoholic: "Alcoholic",
    videoCocktail: null,
  };

  let { body } = req;
  body = { ...body, ...aux };
  console.log("body");
  console.log(body);

  cocktailsdata.cocktails.unshift(body);
  saveToDataBase(cocktailsdata);
  // const { nameCocktail } = body;
  // const { cocktails } = cocktailsdata;
  // const newCocktail = {
  //   id: cocktails.length + 1,
  //   nameCocktail,
  //   ...body,
  // };
  // cocktails.push(newCocktail);
  res.send(body);
});

module.exports = router;
