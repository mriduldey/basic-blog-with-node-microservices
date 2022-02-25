const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event); // posts service
  axios.post("http://localhost:4001/events", event); // comments service
  axios.post("http://localhost:4002/events", event); // query service
  axios.post("http://localhost:4004/events", event); // moderation service

  res.send({ status: "OK" });
});

app.listen(4003, () => {
    console.log("Event bus running on port 4003");
})
