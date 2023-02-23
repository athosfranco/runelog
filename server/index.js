const axios = require("axios");
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");

const app = express();

app.use(cors());

const port = 3001;

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/api/player/:name", async (req, res) => {
  const name = req.params.name;
  const url = `https://secure.runescape.com/m=hiscore/index_lite.ws?player=${name}`;
  console.log("trying");
  try {
    const response = await axios.get(url);
    res.send(response.data);
    console.log(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving player data");
  }
});
