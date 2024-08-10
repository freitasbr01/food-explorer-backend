const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersValidatedController {
  async index(request, response) {
    const { user } = request;
    
    try {
      const userExists = await knex("users").where({ id: user.id }).first();

      if (!userExists) {
        throw new AppError("Unauthorized", 401);
      }

      return response.status(200).json({ message: "User is validated" });

    } catch (error) {
      console.error("Error in UsersValidatedController:", error);
      throw new AppError("Internal server error", 500);
    }
  }
}

module.exports = UsersValidatedController;


