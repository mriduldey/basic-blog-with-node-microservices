import React from "react";

const CommentList = ({ comments }) => {
  const renderComments = comments.map(({ id, content, status }) => {
    let commentContent = "";

    if (status === "approved") {
      commentContent = content;
    }

    if (status === "pending") {
      commentContent = "This comment is awaiting for moderation";
    }

    if (status === "rejected") {
      commentContent = "This comment is rejected";
    }

    return commentContent && <li key={id}>{commentContent}</li>;
  });
  return <ul>{renderComments}</ul>;
};

export default CommentList;
