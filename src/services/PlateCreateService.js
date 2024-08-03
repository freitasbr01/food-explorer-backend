class PlateCreateService {
  constructor(plateRepository) {
    this.plateRepository = plateRepository;
  }

  async execute({ imageFilename, title, description, category, ingredients, price, user_id }) {
    const plateCreated = await this.plateRepository.create({ imageFilename, title, description, category, ingredients, price, user_id });

    return plateCreated;
  }
}

module.exports = PlateCreateService;

