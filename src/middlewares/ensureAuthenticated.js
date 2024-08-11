const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.cookie;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const token = authHeader.split('token=')[1];

  if (!token) {
    throw new AppError("JWT Token não encontrado no cookie", 401);
  }

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);
    
    request.user = {
      id: Number(user_id),
      role
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

module.exports = ensureAuthenticated;





// const { verify } = require("jsonwebtoken");
// const AppError = require("../utils/AppError");
// const authConfig = require("../configs/auth");

// function ensureAuthenticated(request, response, next) {
//   const authHeader = request.headers;

//  console.log(authHeader.cookie)

 
//   if(!authHeader.cookie) {
//     throw new AppError("JWT Token não informado", 401);
//   }

//   const [, token] = authHeader.cookie.split('token=');

//   try {
//     const { role, sub: user_id } = verify(token, authConfig.jwt.secret);
    
//     request.user = {
//       id: Number(user_id),
//       role
//     };

//     return next();
//   } catch {
//     throw new AppError('Invalid JWT token', 401);
//   }

// }

// module.exports = ensureAuthenticated;