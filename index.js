const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { Redis } = require("ioredis");
const client = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST, 
  password: process.env.REDIS_PASSWORD,
});
const port = 3000;
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { name, regno, score } = req.body;
  if(!name || !regno || !score){
    return res.status(400).send("Invalid data");
  }
  const user = { name, regno, score };
  await client.set(`${name}:${regno}`, JSON.stringify(user));
  res.status(200).send("Data saved");
});
app.get("/", async (req, res) => {
  const keys = await client.keys("*");
  console.log(keys);
  if (!keys) {
    return res.status(404).send({});
  }
  const users = JSON.parse(await client.mget(keys));
  if (!users) {
    return res.status(404).send({});
  } else {
    res.status(200).send(users);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
