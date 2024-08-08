const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { Redis } = require("ioredis");
const client = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  password: process.env.REDIS_PASSWORD,
});
const port = 3000;
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { name, regno, score } = req.body;
  const user = { name, regno, score };
  await client.set(regno, JSON.stringify(user));
  res.status(200).send("Data saved");
});
app.get("/", async (req, res) => {
  const keys = await client.keys("*");
  console.log(keys);
  const users = JSON.parse(await client.mget(keys));
  console.log(users);

  res.status(200).send(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
