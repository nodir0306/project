const {config} =  require("dotenv")
config()
const databseConfig = {
    url: process.env.MONGO_URL + process.env.MONGO_DATABSE_NAME
}
module.exports = {databseConfig}