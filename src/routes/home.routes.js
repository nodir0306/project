const { Router } = require("express");
const homeController = require("../controllers/home.controller.js");

const homeRouter = Router();

homeRouter.get("/", homeController.getAllHomes);
homeRouter.get("/:id",homeController.getOneHome);
homeRouter.post("/create",homeController.createHome);
homeRouter.delete("/delete/:id",homeController.deleteHome);
homeRouter.patch("/update/:id",homeController.updateHome);

module.exports = homeRouter;
