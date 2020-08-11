const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });


const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once("open", () => {
  console.log("connection to mongoDB database established sucessfully!");
  app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
  });
});

const todosRouter = require("./routes/todos");

app.use('/todos', todosRouter);


