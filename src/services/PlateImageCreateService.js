class PlateImageCreateService {
  constructor(plateImageRepository) {
    this.plateImageRepository = plateImageRepository;
  }

  async execute({ imageFilename, user_id }) {
    const plateImageCreated = await this.plateImageRepository.create({ imageFilename, user_id });

    return plateImageCreated;
  }
}

module.exports = PlateImageCreateService;

