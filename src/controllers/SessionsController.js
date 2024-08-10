const SessionRepository = require('../repositories/SessionRepository');
const SessionCreateService = require('../services/SessionCreateService');

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const sessionRepository = new SessionRepository();
    const sessionCreateService = new SessionCreateService(sessionRepository);

    const { user, token } = await sessionCreateService.execute({ email, password});

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 35 * 60 * 1000
    });

    delete user.password;
    response.status(201).json({ user });
  }
}

module.exports = SessionsController;