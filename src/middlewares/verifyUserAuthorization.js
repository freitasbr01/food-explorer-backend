// Separando a lógica da parte de AUTORIZAÇÃO, de fazer a verificação se o usuário tem permissão ou não para executar as rotas e funções dentro da api

const AppError = require("../utils/AppError");

function verifyUserAuthorization(roleToVerify) {
  return (request, response, next) => {
    const { role } = request.user;

    if (!roleToVerify.includes(role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  }
}

module.exports = verifyUserAuthorization;