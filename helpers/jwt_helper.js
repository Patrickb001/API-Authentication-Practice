const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = "some super secret";
      const options = {
        expiresIn: "1h",
        issuer: "auth-pprograms.netlify.app",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (error, token) => {
        if (error) return reject(error);
        resolve(token);
      });
    });
  },
};
