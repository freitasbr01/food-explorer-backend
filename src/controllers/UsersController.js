// CONTROLADOR DA API
// Lida com requisições HTTP, chama os serviços necessários e retorna as respostas apropriadas.

const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const UserUpdateRoleService = require("../services/UserUpdateRoleService");


class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });
    return response.status(201).json();
  }

  async index(request, response) {
    const userRepository = new UserRepository();

    const users = await userRepository.findAll();
    return response.json(users);
  }

  async update(request, response) {
    const { userId } = request.params;
    const { role } = request.body;

    const userRepository = new UserRepository();
    const userUpdateRoleService = new UserUpdateRoleService(userRepository);

    await userUpdateRoleService.execute({ userId, role });
    return response.status(200).json();
  }




  
}

module.exports = UsersController;