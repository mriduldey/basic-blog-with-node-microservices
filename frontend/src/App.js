import React from "react";
import PostCreate from "./postCreate";
import PostList from "./PostList";

const App = () => {
  console.log(1);
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <PostList />
    </div> 
  );
};

export default App;
