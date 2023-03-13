const fs = require("fs");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const openApiValidator = require("express-openapi-validator");
const jsYaml = require("js-yaml");
const { VError } = require("verror");
const morgan = require("morgan");
const helmet = require("helmet");
const spec = fs.readFileSync(path.join(__dirname, "openapi.yaml"), "utf8");
const apiSpec = jsYaml.load(spec);

const registerInApp = (app) => {
  app.use(helmet());
  app.use(morgan("dev"));
  app.use("/admin/swagger", swaggerUI.serve, swaggerUI.setup(apiSpec));
  app.use(
    openApiValidator.middleware({
      apiSpec,
      operationHandlers: path.join(__dirname, "controllers"),
      validateResponses: true,
    })
  );
  app.use((err, req, res, next) => {
    void next;
    const statusCode = err.status || VError.info(err).statusCode || 500;
    if (statusCode >= 500) {
      console.error(err);
    }
    res.status(statusCode).json({
      message: err.message,
      errors: err.errors,
    });
  });
};

module.exports = { registerInApp };
