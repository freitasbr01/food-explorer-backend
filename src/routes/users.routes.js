// Define as rotas e associa as rotas às funções do controlador.

const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
const UsersValidatedController = require("../controllers/UsersValidatedController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const usersRoutes = Router();
const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post('/', usersController.create)
usersRoutes.post('/valitaded', ensureAuthenticated, usersValidatedController.index)

module.exports = usersRoutes;