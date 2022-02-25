const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
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
  const status = "pending";
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content, status });

  commentsByPostId[id] = comments;

  await axios.post("http://localhost:4003/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      status,
      postId: id,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received event", type);
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://localhost:4003/events", {
      type: "CommentUpdated",
      data: {
        postId,
        id,
        status,
        content,
      },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Comments Server started listening to port 4001");
});
