import React from "react";
import Link from "next/link";

interface PostLinkProps {
  title: string
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
    <ul>
      <PostLink title="hello world"></PostLink>
      <PostLink title="title1"></PostLink>
      <PostLink title="title2"></PostLink>
    </ul>
  </div>
);

export default Index;