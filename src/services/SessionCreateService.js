const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

class SessionCreateService {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute({ email, password }) {
    const user = await this.sessionRepository.findByEmail(email);
    
    if(!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    });

    return { user, token }
  }
}

module.exports = SessionCreateService;