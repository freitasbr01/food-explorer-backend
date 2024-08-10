class UserUpdateRoleService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ userId, role }) {
    const updatedRole = await this.userRepository.update({ userId, role });

    return updatedRole;
  }
}

module.exports = UserUpdateRoleService;