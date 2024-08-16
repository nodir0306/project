const { isValidObjectId } = require("mongoose");
const Home = require("../models/home.model");

class homeController {
  #_home_model;
  constructor() {
    this.#_home_model = Home;
  }

  getAllHomes = async (req, res) => {

    let query = {...req.query}

    const bannedQueries = ["limit","page","sort"]

    bannedQueries.map((bannedQuary)=>delete query[bannedQuary])

    query = JSON.parse(
        JSON.stringify(query).replace(/\b(lt|lte|gt|gte)\b/g,(match)=>`$${match}`)
    )

    let databaseQuery  = this.#_home_model.find(query);

    const limit = req.query?.limit || 50;
    const offset = req.query?.page ? (req.query.page-1)*limit : 0

    const allHomes = await databaseQuery
        .limit(limit)
        .skip(offset)

    try {
      res.status(200).send({
        message: "ok",
        results: allHomes.length,
        page: req.query?.page || 0,
        limit: limit,
        data: allHomes,
      });
    } catch (error) {
      console.error("Error fetching homes: ", error);
      res.status(500).send({
        message: "Bad response",
        error_title: "An error occurred while fetching homes",
      });
    }
  };

  getOneHome = async (req, res) => {
    try {
        const { id } = req.params;
        const foundedHome = await this.#_home_model.findById(id);
    
        if (!foundedHome) {
          return res.status(404).send({
            message: "Home not found",
          });
        }
    
        res.send({
          message: "ok",
          data: foundedHome,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error fetching home",
            error_title: error
        })
    }
  };

  createHome = async (req, res) => {
    try {
      const newHome = new this.#_home_model(req.body);
      await newHome.save();
      res
        .status(201)
        .send({ message: "Home created successfully", data: newHome });
    } catch (err) {
      res.status(400).send({ message: "Error creating home", error: err });
    }
  };

  deleteHome = async (req, res) => {
    try {
      const { id } = req.params;
        this.#_checkIsValidObjectId(id)
      const result = await Home.deleteOne({ _id: id });
      res.status(200).send({ message: "Home deleted successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error deleting home", error: err });
    }
  };

  updateHome = async (req, res) => {
    try {
      const {
        area,
        price,
        address,
        isBoys,
        roomsCound,
        bathRoomsCount,
        status,
        isWifi,
        additionalInformation,
        sellerPhoneNumber,
        isConditsioner,
        isOwnerHouse,
      } = req.body;
      const { id } = req.params;

      this.#_checkIsValidObjectId(id)

      await this.#_home_model.updateOne(
        { _id: id },
        {
          $set: {
            area: area,
            price: price,
            address: address,
            isBoys: isBoys,
            roomsCound: roomsCound,
            bathRoomsCount: bathRoomsCount,
            status: status,
            isWifi: isWifi,
            additionalInformation: additionalInformation,
            sellerPhoneNumber: sellerPhoneNumber,
            isConditsioner: isConditsioner,
            isOwnerHouse: isOwnerHouse,
          },
        }
      );

      return res.status(200).send({
        message: "Home updated successfully",
      });
    } catch (err) {
      return res.status(500).send({
        message: "Error updating home",
        error: err.message,
      });
    }
  };

  #_checkIsValidObjectId = (id) =>{
    if(!isValidObjectId(id)){
        throw new Error(`No house with UID:${id} found`)
    }
    return null
  }

}

module.exports = new homeController();
