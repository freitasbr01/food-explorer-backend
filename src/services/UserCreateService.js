// LÓGICA DE NEGÓCIO RELACIONADA A CRIAÇÃO DE USUÁRIOS.
// Contém a lógica de criação usando o UserRepository para inserir no banco de dados.

const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail({ email });
    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassord = await hash(password, 8);
    const userCreated = await this.userRepository.create({ name, email, password: hashedPassord });

    return userCreated;    
  }
}

module.exports = UserCreateService;