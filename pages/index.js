import React, { Component } from "react";
import Home from "./home";
import Link from "next/link";

const PostLink = props => (
  <li>
    <Link href={`/p/[id]`} as={`/p/${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

const App = () => (
  <div>
    <ul>
      <PostLink title="hello world"></PostLink>
      <PostLink title="title1"></PostLink>
      <PostLink title="title2"></PostLink>
    </ul>
  </div>
);

export default App;
