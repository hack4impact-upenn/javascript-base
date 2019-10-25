import Head from "next/head";
import Navbar from "../Navbar";

const Layout = props => (
  <div>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <Head>
      <title>Admin Dashboard</title>
    </Head>
    <Navbar />
    <div className="container">{props.children}</div>
  </div>
);

export default Layout;
