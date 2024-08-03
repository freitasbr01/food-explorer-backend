const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class PlateImageRepository {
  async create({ imageFilename }) {
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imageFilename)

    await knex("plates").insert({ image_url: filename })
  }

  async update({ id, imageFilename }) {
    const plates = await knex('plates').where({ id }).first();
    const diskStorage = new DiskStorage();

    if (imageFilename) {
      if (plates.image_url) {
        await diskStorage.deleteFile(plates.image_url)
      }
    }
    
    const filename = await diskStorage.saveFile(imageFilename)

    await knex('plates').where({ id }).update({image_url: filename});
  }

}

module.exports = PlateImageRepository;