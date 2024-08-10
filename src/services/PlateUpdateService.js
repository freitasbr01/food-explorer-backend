class PlateUpdateService {
  constructor(plateRepository) {
    this.plateRepository = plateRepository;
  }

  async execute({ id, imageFilename, title, category, price, description, ingredients, user_id }) {
    const updatedPlate = await this.plateRepository.update({
      id, 
      imageFilename, 
      title, 
      category, 
      price, 
      description, 
      ingredients, 
      user_id 
    })

    return updatedPlate;
  }
}

module.exports = PlateUpdateService;