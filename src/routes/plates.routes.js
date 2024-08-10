const { Router } = require ('express')
const PlatesController = require('../controllers/PlatesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER)

const platesRoutes = Router();
const platesController = new PlatesController();

platesRoutes.use(ensureAuthenticated);

platesRoutes.post('/', verifyUserAuthorization(["admin"]), upload.single("image"), platesController.create);
platesRoutes.get('/:id', verifyUserAuthorization(["admin", "customer"]), platesController.show);
platesRoutes.delete('/:id', verifyUserAuthorization(["admin"]), platesController.delete);
platesRoutes.get('/', verifyUserAuthorization(["admin", "customer"]), platesController.index);
platesRoutes.patch('/:id', verifyUserAuthorization(["admin"]), upload.single("image"), platesController.update);


module.exports = platesRoutes;