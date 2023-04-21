const { Favorite } = require("../DB_connection");

const STATUS_OK = 200;
const STATUS_ERROR = 500;

const postFav = async (req, res) => {
  const { name, status, species, gender, origin, image } = req.body;

  try {
    if (!name || !status || !species || !gender || !origin || !image) {
      res
        .status(STATUS_ERROR)
        .json({ message: "The require information is missing" });
    }

    const newFav = await Favorite.findOrCreate({
      where: { name: name },
      defaults: {
        status,
        species,
        gender,
        origin,
        image,
      },
    });

    const favs = await Favorite.findAll();
    res.status(200).json(favs);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

module.exports = postFav;
