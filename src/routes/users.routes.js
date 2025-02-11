// Define as rotas e associa as rotas às funções do controlador.

const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
const UsersValidatedController = require("../controllers/UsersValidatedController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');


const usersRoutes = Router();
const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post('/', usersController.create)
usersRoutes.get("/validated", ensureAuthenticated,  usersValidatedController.index);

usersRoutes.put('/:userId/role', ensureAuthenticated, verifyUserAuthorization(["admin"]), usersController.update);
usersRoutes.get('/', ensureAuthenticated, verifyUserAuthorization(["admin"]), usersController.index);


module.exports = usersRoutes;