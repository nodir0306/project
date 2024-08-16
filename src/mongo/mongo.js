const mongoose = require("mongoose");
const {databseConfig} = require("../config/mongo.config.js");
const morgan = require("morgan");

async function mongoDB() {
    await mongoose.connect(databseConfig.url)
}

module.exports = mongoDB