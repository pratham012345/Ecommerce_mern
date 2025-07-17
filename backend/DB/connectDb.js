const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Db is Connected");
    })
    .catch(() => {
      console.log("Db is not connected");
    });
}
module.exports = connectDb;
