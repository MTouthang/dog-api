const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB not connected!"));

const dogRoutes = require("./route/dog");

// middle ware --
app.use(bodyParser.json());

//routes
app.use("/api", dogRoutes);

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
