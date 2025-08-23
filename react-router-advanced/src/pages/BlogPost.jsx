import { useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h1>📝 Blog Post #{id}</h1>
      <p>This is a dynamically loaded blog post with ID {id}.</p>
    </div>
  );
}

export default BlogPost;
