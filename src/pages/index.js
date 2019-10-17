import React from "react";
import Link from "next/link";

const PostLink = props => (
  <li>
    <Link href={`/p/[id]`} as={`/p/${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

const Index = () => (
  <div>
    <h1>
      <a href="/api">GraphQL</a>
    </h1>
    <ul>
      <PostLink title="hello world"></PostLink>
      <PostLink title="title1"></PostLink>
      <PostLink title="title2"></PostLink>
    </ul>
  </div>
);

export default Index;
