// LÓGICA DO BANCO DE DADOS

const knex = require("../database/knex")

class UserRepository {
  async findByEmail({ email }) {
    const user = await knex('users').where({ email }).first();

    return user;
  }

  async create({ name, email, password }) {
    const userId = await knex('users').insert({
      name,
      email,
      password
    });

    return { id: userId };
  }

  async findAll() {
    const users = await knex('users').select('*');
    return users;
  }

  async update({ userId, role }) {
    await knex('users').where({ id: userId }).update({ role });
  }
}

module.exports = UserRepository;