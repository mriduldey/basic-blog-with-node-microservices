const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  //store all the events
  events.push(event);
  try {
    axios.post("http://localhost:4000/events", event); // posts service
    axios.post("http://localhost:4001/events", event); // comments service
    axios.post("http://localhost:4002/events", event); // query service
    axios.post("http://localhost:4004/events", event); // moderation service
  } catch (err) {
    console.log(err.message);
  }
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4003, () => {
  console.log("Event bus running on port 4003");
});
