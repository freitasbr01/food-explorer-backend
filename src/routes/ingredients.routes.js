const { Router } = require('express');
const IngredientsController = require('../controllers/IngredientsController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const ingredientsController = new IngredientsController();
const ingredientsRoutes = Router();

ingredientsRoutes.use(ensureAuthenticated);
ingredientsRoutes.use(verifyUserAuthorization(["admin", "customer"]));

ingredientsRoutes.get('/', ingredientsController.index);

module.exports = ingredientsRoutes;