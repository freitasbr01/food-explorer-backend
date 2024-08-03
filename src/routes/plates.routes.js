const { Router } = require ('express')
const PlatesController = require('../controllers/PlatesController');
const PlateImageController = require("../controllers/PlateImageController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER)

const platesRoutes = Router();
const platesController = new PlatesController();
const plateImageController = new PlateImageController();

platesRoutes.use(ensureAuthenticated);

platesRoutes.post('/', verifyUserAuthorization(["admin"]), platesController.create);
platesRoutes.get('/:id', verifyUserAuthorization(["admin", "customer"]), platesController.show);
platesRoutes.delete('/:id', verifyUserAuthorization(["admin"]), platesController.delete);
platesRoutes.get('/', verifyUserAuthorization(["admin", "customer"]), platesController.index);
platesRoutes.patch('/:id', verifyUserAuthorization(["admin"]), platesController.update);

platesRoutes.post('/image', verifyUserAuthorization(["admin"]), upload.single("image_plate"), plateImageController.create);
platesRoutes.patch('/:id/image', verifyUserAuthorization(["admin"]), upload.single("image_plate"), plateImageController.update);

module.exports = platesRoutes;