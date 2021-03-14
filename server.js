const express = require("express");
var cors = require("cors");
require("dotenv").config();
const logger = require("morgan");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const routes = require("./routes");

const app = express();

const port = process.env.PORT || 3000;

//mongoose options
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

//connect to database
mongoose.connect(process.env.MONGO_URL, mongooseOptions).then(
  () => console.log("Database Connection established!"),
  (err) => console.log(err)
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(cors());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    let responseBody = {
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    };
    return res.status(400).json(responseBody);
  }

  next();
});
//use routes
app.use("/api/v1", routes);

process.on("unhandledRejection", (error) => {
  console.error("Uncaught Error", error);
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
