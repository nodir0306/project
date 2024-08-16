const express = require("express"); 
const { serverConfig } = require("./config/sever.config.js");

const mongoDB = require("./mongo/mongo.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");

const server = express(); 

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
mongoDB()
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log("Error connecting to MongoDB:", err)); 

server.use("/api/v1", routes);

server.listen(serverConfig.SERVER_PORT, () => {
    console.log(`Server is running at http://${serverConfig.SERVER_HOST}:${serverConfig.SERVER_PORT}`);
});
