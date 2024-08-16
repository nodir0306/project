const Home = require("../models/home.model");

class UserController {
    constructor() {}

    async getAllHomes(req, res) {

            const allHomes = await Home.find();
            res.send({ 
                message: "ok",
                results: allHomes.length,
                data: allHomes
            });

    }

    
    async createHome(req, res) {
        try {
            const newHome = new Home(req.body);
            await newHome.save();
            res.status(201).send({ message: "Home created successfully", data: newHome });
        } catch (err) {
            res.status(400).send({ message: "Error creating home", error: err });
        }
    }

    async deleteHome(req, res) {
        try {
            const { id } = req.params;
            const result = await Home.deleteOne({ _id: id });
            res.status(200).send({ message: "Home deleted successfully" });
        } catch (err) {
            res.status(500).send({ message: "Error deleting home", error: err });
        }
    }
    

}

module.exports = new UserController();
