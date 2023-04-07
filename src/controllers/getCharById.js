const axios  = require("axios");

const url = "https://rickandmortyapi.com/api/character";

const getCharById = (res, id) => {
  axios
    .get(`${url}/${id}`)
    .then((response) => response.data)
    .then(data => {
      const character = {
        id: data.id,
        name: data.name,
        gender: data.gender,
        species: data.species,
        origin: data.origin,
        image: data.image,
        status: data.status,
      };
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(character));
    })
    .catch((error) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end({"message": "Personaje no encontrado"});
    //   res.end(JSON.stringify(error.message));
    });
};

module.exports =  getCharById;
