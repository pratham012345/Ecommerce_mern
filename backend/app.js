const express = require("express");
const app = express();
let PORT = 8080;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index");
const connectDb = require("./DB/connectDb");

connectDb();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is connected ${PORT}`);
});
