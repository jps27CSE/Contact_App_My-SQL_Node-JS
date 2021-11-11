const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const dbService = require("./dbService");
const { response } = require("express");
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create
app.post("/contacts", (req, res) => {
  let { name, phone, email, id } = req.body;
});

//read
app.get("/getcontact", (req, res) => {
  const db = dbService.getDbServiceInstace();
  const result = db.getAllData();
  result
    .then((data) => {
      res.render("index", { data: data });
    })
    .catch((err) => console.log(err));
});

//update

//delete

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server is Running on Port = http://localhost:${PORT}`)
);
