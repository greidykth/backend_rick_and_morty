const { Router } = require("express");
const rickandMortyRoutes = require("./rickandMortyRoutes");

const router = Router();

router.use("/rickandmorty", rickandMortyRoutes );

router.get("/", (req, res) => {
  res.json({message: "Bienvenido a la aplicación de Rick and Morty"});
});



module.exports = router;
