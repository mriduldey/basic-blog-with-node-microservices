const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const {
    type,
    data: { id, postId, content },
  } = req.body;

  if (type === "CommentCreated") {
    const status = content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4003/events", {
      type: "CommentModerated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4004, () => console.log("Moderation running on 4004"));
