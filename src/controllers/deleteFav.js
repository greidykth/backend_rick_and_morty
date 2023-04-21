const { Favorite } = require("../DB_connection");

const STATUS_OK = 200;
const STATUS_ERROR = 500;

const deleteFav = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Id is required" });
    }

    const findFavorite = await Favorite.findByPk(id);

    if (!findFavorite) res.status(404).json({ message: "Id not found" });

    const favoriteDeleted = await Favorite.destroy({
      where: {
        id: id,
      },
    });

    const favs = await Favorite.findAll();
    res.status(200).json(favs);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

module.exports = deleteFav;
