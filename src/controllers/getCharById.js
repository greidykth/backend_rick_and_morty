const axios  = require("axios");

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_ERROR = 500;
const URL = process.env.API_URL;

const getCharById = (req, res) => {

  const {id} = req.params;
  
  axios.get(`${URL}${id}`)
  .then(response => response.data)
  .then(data => {
    if(!data) res.status(STATUS_NOT_FOUND).json({message: "Not Found"});

    const {id, status, name, species, origin, image, gender} = data;
    const character = {
      id,
      status,
      name,
      species,
      origin,
      image,
      gender
    }
    res.status(STATUS_OK).json(character);
  })
  .catch(error  =>  res.status(STATUS_ERROR).json({error: error.message}));
}

module.exports =  getCharById;
