import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setposts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setposts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = Object.values(posts).map(({id, title, comments}) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={id}
      >
        <div className="card-body">
          <h3>{title}</h3>
          <CommentCreate postId={id} />
          <CommentList comments={comments} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
};

export default PostList;
