const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class PlateRepository {
  async create({ imageFilename, title, description, category, ingredients, price, user_id }) {

    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imageFilename)

    const [plate_id] = await knex("plates").insert({
      image_url: filename,
      title,
      category,
      price,
      description,      
      user_id,
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        plate_id,
        ingredient,
        user_id
      }
    })

    await knex("ingredients").insert(ingredientsInsert);
  }  

  async findById(plate_id) {
    const plate = await knex("plates").where({ id: plate_id }).first();
    return plate;
  }

  async findIngredientsByPlateId(plate_id) {
    const ingredients = await knex("ingredients").where({ plate_id }).orderBy("ingredient");
    return ingredients;
  }

  async delete(plate_id) {
    await knex('plates').where({ id: plate_id }).delete();
  }

  async findPlatesWithIngredients(user_id, title, filterIngredients) {
    const plates = await knex("plates")
    .innerJoin("ingredients", "plates.id", "ingredients.plate_id")
    .select([
      "plates.id",
      "plates.title",
      "plates.user_id",
    ])
    .where("plates.user_id", user_id)
    .whereLike("plates.title", `%${title}%`)
    .whereIn("ingredients.ingredient", filterIngredients)
    .groupBy("plates.id")
    .orderBy("plates.title");

    return plates;
  }

  async findPlates(user_id, title) {
    const plates = await knex('plates')
    .where({ user_id })
    .whereLike("title", `%${title}%`)
    .orderBy('title')

    return plates;
  }

  async findUserIngredients(user_id) {
    const userIngredients = await knex('ingredients').where({ user_id })

    return userIngredients;
  }

  async update({ id, imageFilename, title, category, price, description, ingredients, user_id }) {
    const plate = await knex('plates').where({ id }).first();
    
    const diskStorage = new DiskStorage();
    let filename = plate.image_url;

    if (imageFilename) {
      if (plate.image_url) {
        await diskStorage.deleteFile(plate.image_url)
      }
      filename = await diskStorage.saveFile(imageFilename)
    }
    

    const updatedPlate = {
      ...plate,
      image_url: filename,
      title: title ?? plate.title,
      category: category ?? plate.category,
      price: price ?? plate.price,
      description: description ?? plate.description,
    };

    await knex('plates').where({ id }).update(updatedPlate);

    if (ingredients) {
      await knex('ingredients').where({ plate_id: id }).delete();

      const ingredientsInsert = ingredients.map(ingredient => {
        return {
          plate_id: id,
          ingredient,
          user_id
        };
      });
      
      await knex('ingredients').insert(ingredientsInsert);
    }

    return updatedPlate;
  }
};

module.exports = PlateRepository;