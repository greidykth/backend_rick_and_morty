let myFavorites = [];

const postFav = (req, res) => {

    myFavorites.push(req.body)
    res.status(200).json(myFavorites);
}

const deleteFav = (req, res) => {
    const {id} = req.params;

    const findFavorite = myFavorites.find( character => character.id === Number(id))

    try {
        if(!findFavorite) throw Error ("Id not found");
        myFavorites.filter(favorite => favorite.id !== Number(id));
        res.status(200).json(myFavorites);
    } catch (error) {
        res.status(422).json({error: error.message});
    }
}

module.exports = {
    postFav, deleteFav
}