import React from "react";
import Link from "next/link";

import Navbar from "../components/Navbar";

interface PostLinkProps {
  title: string;
}

class PostLink extends React.Component<PostLinkProps, {}> {
  public render = () => (
    <li>
      <Link href={`/p/[id]`} as={`/p/${this.props.title}`}>
        <a>{this.props.title}</a>
      </Link>
    </li>
  );
}

const Index = () => (
  <div>
    <Navbar></Navbar>
    <ul>
      <li><a href="/api">GraphQL</a></li>
      <li><a href="/login">Login</a></li>
      <PostLink title="hello world"></PostLink>
      <PostLink title="title1"></PostLink>
      <PostLink title="title2"></PostLink>
    </ul>
  </div>
);

export default Index;