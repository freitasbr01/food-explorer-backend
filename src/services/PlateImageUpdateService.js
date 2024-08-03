class PlateImageUpdateService {
  constructor(plateImageRepository) {
    this.plateImageRepository = plateImageRepository;
  }

  async execute({ id, imageFilename }) {
    const plateImageUpdated = await this.plateImageRepository.update({ id, imageFilename });

    return plateImageUpdated;
  }
}

module.exports = PlateImageUpdateService;

