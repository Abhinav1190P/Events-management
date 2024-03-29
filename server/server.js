const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

dotenv.config();

const server = http.createServer(app);

// db connect
mongoose
  .connect("mongodb://127.0.0.1:27017/club")
  .then(() => {
    console.log("mongodb connected");

    server.listen(4000, (
    ) => {
      console.log(`Server running on port: ${4000}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
