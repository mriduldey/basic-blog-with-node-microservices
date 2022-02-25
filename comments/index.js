const express = require("express");
const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params; // post id
  res.send(commentsByPostId[id]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params; //post id
  const { content } = req.body;

  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[id] || [];
  comments.push({ commentId, content });

  commentsByPostId[id] = comments;

  await axios.post("http://localhost:4003/events", {
    type: "CommentCreated",
    data: { 
      id: commentId,
      content,
      postId: id
    },
  }); 

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  const {body: {type}} = req;
  console.log("Received event", type);
  res.send({});
})

app.listen(4001, () => {
  console.log("Comments Server started listening to port 4001");
});
