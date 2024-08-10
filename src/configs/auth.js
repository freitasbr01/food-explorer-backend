module.exports = {
  jwt: {
    secret: process.eventNames.AUTH_SECRET || "default",
    expiresIn: "1d"
  }
}