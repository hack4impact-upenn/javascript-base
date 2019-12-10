import React from "react";
import NextLink from "next/link";

import Navbar from "../components/Navbar";

const Index = () => (
  <React.Fragment>
    <Navbar />
    <ul>
      <li><NextLink href="/api">GraphQL</NextLink></li>
      <li><NextLink href="/files">My Files</NextLink></li>
      <li><NextLink href="/upload">Upload</NextLink></li>
      <li><NextLink href="/profile">Profile</NextLink></li>
      <li><NextLink href="/admin">Admin</NextLink></li>
    </ul>
  </React.Fragment>
);

export default Index;
