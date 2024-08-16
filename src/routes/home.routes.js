const { Router } = require("express");
const homeController = require("../controllers/home.controller.js");

const homeRouter = Router();

homeRouter.get("/", homeController.getAllHomes);
homeRouter.post("/create",homeController.createHome);
homeRouter.delete("/delete/:id",homeController.deleteHome)

module.exports = homeRouter;
