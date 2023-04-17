const STATUS_OK = 200;
const STATUS_ERROR = 404;
const STATUS_ERROR_DUPLICATED = 400;

let myFavorites = [];

const postFav = (req, res) => {
  const { id, name, status, species, gender, origin, image } = req.body;

  try {
    if (!id || !name || !image) {
      return res
        .status(STATUS_ERROR)
        .json({ message: "The require information is missing" });
    }
    const findFavorite = myFavorites.find(
      (character) => character.id === Number(id)
    );
    if (findFavorite)
      res.status(STATUS_ERROR_DUPLICATED).json({ message: "Fav already was added" });

    const character = {
      id,
      name,
      status,
      species,
      gender,
      origin,
      image,
    };
    myFavorites.push(character);
    res.status(STATUS_OK).json(myFavorites);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

const deleteFav = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(STATUS_ERROR).json({ message: "Id is required" });
    }
    const findFavorite = myFavorites.find(
      (character) => character.id === Number(id)
    );
    if (!findFavorite)
      res.status(STATUS_ERROR).json({ message: "Id not found" });

    myFavorites = myFavorites.filter((favorite) => favorite.id !== Number(id));

    res.status(STATUS_OK).json(myFavorites);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

module.exports = {
  postFav,
  deleteFav,
};
