const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const postRouter = require("./routers/post-router");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const port = process.env.PORT || 8000;
if (!process.env.PORT)
  console.log("cannot find port -----------------------------");
//console.log(process.env);

app.use(express.json());
app.use("/", postRouter);

app.listen(port, () => {
  console.log("Server is upp on port " + port);
});
