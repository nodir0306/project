const {config} =  require("dotenv")
config()

const serverConfig = {
    "SERVER_PORT": parseInt(process.env.SERVER_PORT) || 7070,
    "SERVER_HOST": process.env.SERVER_HOST,
} 
const databseConfig = {
    url: process.env.MONGO_URL + process.env.MONGO_DATABSE_NAME
}
module.exports = {serverConfig,databseConfig}