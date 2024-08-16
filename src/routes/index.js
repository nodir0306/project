const { Router } = require("express");
const homeRouter = require("./home.routes.js");

const routes = Router();

routes.use("/homes", homeRouter);

module.exports = routes;
