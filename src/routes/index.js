const { Router } = require("express");
const rickandMortyRoutes = require("./rickandMortyRoutes");

const router = Router();

router.get("/", (req, res) => {
  res.json({message: "Bienvenido a la aplicación de Rick and Morty"});
});

router.use("/rickandmorty", rickandMortyRoutes );


module.exports = router;
