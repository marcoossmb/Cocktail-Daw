class Cocktail {
    constructor(idCocktail, nameCocktail, videoCocktail, nameCategory, isAlcoholic, nameGlass, instructions, imageCocktail, ingredientsCocktail) {
        this.idCocktail = idCocktail;
        this.nameCocktail = nameCocktail;
        this.videoCocktail = videoCocktail;
        this.nameCategory = nameCategory;
        this.isAlcoholic = isAlcoholic;
        this.nameGlass = nameGlass;
        this.instructions = instructions;
        this.imageCocktail = imageCocktail;
        this.ingredientsCocktail = ingredientsCocktail;
    }

    getIdCocktail() {
        return this.idCocktail;
    }
    setIdCocktail(idCocktail) {
        this.idCocktail = idCocktail;
    }

    getNameCocktail() {
        return this.nameCocktail;
    }
    setnameCocktail(nameCocktail) {
        this.nameCocktail = nameCocktail;
    }

    getVideoCocktail() {
        return this.videoCocktail;
    }
    setVideoCocktail(videoCocktail) {
        this.videoCocktail = videoCocktail;
    }

    getNameCategory() {
        return this.nameCategory;
    }
    setNameCategory(nameCategory) {
        this.nameCategory = nameCategory;
    }

    getIsAlcoholic() {
        return this.isAlcoholic;
    }
    setIsAlcoholic(isAlcoholic) {
        this.isAlcoholic = isAlcoholic;
    }

    getNameGlass() {
        return this.nameGlass;
    }
    setNameGlass(nameGlass) {
        this.nameGlass = nameGlass;
    }

    getInstructions() {
        return this.instructions;
    }
    setInstructions(instructions) {
        this.instructions = instructions;
    }

    getImageCocktail() {
        return this.imageCocktail;
    }
    setImageCocktail(imageCocktail) {
        this.imageCocktail = imageCocktail;
    }

    getIngredientsCocktail() {
        return this.ingredientsCocktail;
    }
    setIngredientsCocktail(ingredientsCocktail) {
        this.ingredientsCocktail = ingredientsCocktail;
    }
}  