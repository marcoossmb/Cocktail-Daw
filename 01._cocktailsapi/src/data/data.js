const fs = require("fs");

const saveToDataBase=(cocktail)=>{
  fs.writeFileSync("./src/data/json/cocktails.json",JSON.stringify(cocktail,null,2),{
    encoding:"utf-8"
  })

}
module.exports = saveToDataBase;