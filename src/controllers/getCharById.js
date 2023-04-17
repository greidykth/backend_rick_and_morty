const axios  = require("axios");
const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_ERROR = 500;
const URL = process.env.API_URL;

const getCharById = async (req, res) => {

  try {
  const { id } = req.params;
  const response = await axios.get(`${URL}${id}`)

    if(!response.data.name) res.status(STATUS_NOT_FOUND).json({message: "Not Found"});

    const {id : idCharacter, status, name, species, origin, image, gender} = response.data;
    const character = {
      id: idCharacter,
      status,
      name,
      species,
      origin,
      image,
      gender
    }
    res.status(STATUS_OK).json(character);
  
  } catch (error) {
    res.status(STATUS_ERROR).json({error: JSON.stringify(error)})
  }
    
}

module.exports =  getCharById;
