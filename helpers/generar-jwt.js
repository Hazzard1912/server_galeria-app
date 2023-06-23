const jsonwebtoken = require("jsonwebtoken");

const generarJWT = (usuario_id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { usuario_id };
    jsonwebtoken.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
