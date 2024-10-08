const { Schema, model } = require("mongoose");

const homeSchema = new Schema({
    area: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isBoys: {
        type: Boolean,
        required: true,
    },
    roomsCount: {
        type: Number,
    },
    bathRoomsCount: {
        type: Number,
        required: true,
    },
    status: {
        type : String,
        enum: {
            values: ["onSale","soldOut","rejected"]
        }
    },
    isWifi: {
        type: Boolean,
        default: false,
    },
    additionalInformation: {
        type: String,
        default: "",
    },
    sellerPhoneNumber: {
        type: String,
        required: true,
    },
    isConditioner: {
        type: Boolean,
        default: false,
    },
    isOwnerHouse: {
        type: Boolean,
        required: true
    },
    homeImage: {
        type: [String]
    }
});

const Home = model("Home", homeSchema);
module.exports = Home;
