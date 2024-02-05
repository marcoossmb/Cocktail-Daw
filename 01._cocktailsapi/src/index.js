const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const app = express();

// Para poder hacer post, put o patch
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())
const routes = require("./routes/router");
app.use("/apicocktails", routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en el puerto ${PORT}`);
});
