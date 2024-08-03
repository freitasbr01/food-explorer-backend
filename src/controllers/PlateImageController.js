const PlateImageRepository = require("../repositories/PlateImageRepository");
const PlateImageCreateService = require("../services/PlateImageCreateService");
const PlateImageUpdateService = require("../services/PlateImageUpdateService");


class PlateImageController {
  async create(request, response) {
    const { file } = request;
    const imageFilename = file ? file.filename : null;

    const plateImageRepository = new PlateImageRepository();
    const plateImageCreateService = new PlateImageCreateService(plateImageRepository);

    await plateImageCreateService.execute({ imageFilename });

    return response.status(201).json()
  }

  async update(request, response) {
    const { id } = request.params;

    const { file } = request;
    const imageFilename = file ? file.filename : null;

    const plateImageRepository = new PlateImageRepository();
    const plateImageUpdateService = new PlateImageUpdateService(plateImageRepository);

    const updatedPlateImage = await plateImageUpdateService.execute({ id, imageFilename });

    return response.status(201).json(updatedPlateImage)
  }

}


module.exports = PlateImageController;