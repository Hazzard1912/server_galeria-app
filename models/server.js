const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { connect } = require("../database/database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.allowedOrigins = [
      "https://snapserve-c9937.web.app",
      "https://snapserve-c9937.firebaseapp.com",
    ];

    this.paths = {
      auth: "/api/auth",
      usuario: "/api/usuario",
      uploads: "/api/uploads",
    };

    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await connect();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.usuario, require("../routes/usuario.routes"));
    this.app.use(this.paths.uploads, require("../routes/uploads.routes"));
  }

  middlewares() {
    this.app.use(
      cors({
        origin: this.allowedOrigins,
      })
    );

    this.app.use(express.json());

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  startPort() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
