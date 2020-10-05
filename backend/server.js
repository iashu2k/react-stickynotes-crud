const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

require("dotenv").config();

const app = express();
const port = process.env.port || 5000;
const appOrigin = process.env.APP_ORIGIN;
const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;

app.use(cors());
app.use(express.json());

if (!issuer || !audience) {
  throw new Error("Please make sure that .env is in place and populated");
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),

  audience: audience,
  issuer: issuer,
  algorithms: ["RS256"],
});

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

app.use('/todos', checkJwt, todosRouter);
app.use((req, res)=> res.status(404).json('Not-found'));


