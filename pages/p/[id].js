import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();

  return (
    <div>
      <h1>{router.query.id}</h1>
      <p>This is the post page with clean URL.</p>
    </div>
  );
};

export default Post;
