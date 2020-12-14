const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const dataRoute = require("./routes/dataRoute.js");
const userRoute = require("./routes/userRoute.js");
const app = express();

const port = process.env.MY_PORT || 5000;

app.use(express.json());
app.use("/data", dataRoute);
app.use("/users", userRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.listen(port, () => console.log(`Server running at port ${port}`));
