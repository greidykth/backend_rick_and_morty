const {Router} = require('express');
const getCharById = require('../controllers/getCharById');
const login = require('../controllers/login');
const postUser = require('../controllers/postUser');
const postFav = require('../controllers/postFav');
const deleteFav = require('../controllers/deleteFav');

const routes = Router();

routes.get('/character/:id', getCharById);
routes.get("/login", login);
routes.post("/login", postUser);
routes.post("/fav", postFav);
routes.delete("/fav/:id", deleteFav);


module.exports = routes;