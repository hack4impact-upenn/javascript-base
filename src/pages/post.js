import React, { Component } from "react";
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();

  return (
    <div>
      <h1>{router.query.title}</h1>
      <p>This is the post page.</p>
    </div>
  );
};

export default Post;
