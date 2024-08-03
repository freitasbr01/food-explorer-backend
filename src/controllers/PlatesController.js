const PlateRepository = require('../repositories/PlateRepository');
const PlateCreateService = require('../services/PlateCreateService');
const PlateUpdateService = require('../services/PlateUpdateService');

class PlatesController {
  async create(request, response) {
    const { title, category,  price, description, ingredients } = request.body;
    const user_id = request.user.id;

    const plateRepository = new PlateRepository();
    const plateCreateService = new PlateCreateService(plateRepository);

    await plateCreateService.execute({ title, category, price, description, ingredients, user_id });
    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;
    const plateRepository = new PlateRepository();

    const plate = await plateRepository.findById(id);
    const ingredients = await plateRepository.findIngredientsByPlateId(id);

    return response.json({
      ...plate,
      ingredients
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const plateRepository = new PlateRepository();
    await plateRepository.delete(id);

    return response.json();
  }

  async index(request, response) {
    const { title, ingredients } = request.query
    const user_id = request.user.id;

    const plateRepository = new PlateRepository();

    let plates;

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());
      plates = await plateRepository.findPlatesWithIngredients(user_id, title, filterIngredients);
    } else {
      plates = await plateRepository.findPlates(user_id, title);
    }

    const userIngredients = await plateRepository.findUserIngredients(user_id);

    const platesWithIngredients = plates.map(plate => {
      const plateIngredients = userIngredients.filter(ingredient => ingredient.plate_id === plate.id)

      return {
        ...plate,
        ingredients: plateIngredients
      }
    })

    return response.json(platesWithIngredients);

  }

  async update(request, response) {
    const { title, category, price, description, ingredients } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const { file } = request;
    const imageFilename = file ? file.filename : null;

    const plateRepository = new PlateRepository();
    const plateUpdateService = new PlateUpdateService(plateRepository);

    const updatedPlate = await plateUpdateService.execute({ id, imageFilename, title, category, price, description, ingredients, user_id });

    return response.json(updatedPlate);
  }
}

module.exports = PlatesController;