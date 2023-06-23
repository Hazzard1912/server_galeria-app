const { v4: uuidv4 } = require("uuid");

const crearArchivo = (
  files,
  extensionesPermitidas = ["png", "jpg", "jpeg", "gif"],
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");

    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesPermitidas.includes(extension)) {
      return reject(
        `No se permite subir archivos con extension ${extension}, las extensiones permitidas son ${extensionesPermitidas}`
      );
    }
    const nombreArchivo = uuidv4() + "." + extension;
    resolve(nombreArchivo);
  });
};

module.exports = {
  crearArchivo,
};
