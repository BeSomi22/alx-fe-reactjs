// import { useQuery } from "react-query";
// import axios from "axios";

// const fetchPosts = async () => {
//   const { data } = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts"
//   );
//   return data;
// };

// function PostsComponent() {
//   const {
//     data: posts,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetching,
//   } = useQuery("posts", fetchPosts, {
//     staleTime: 5000, // 5 seconds before refetching
//     cacheTime: 1000 * 60 * 5, // cache persists for 5 min
//   });

//   if (isLoading) return <p>Loading posts...</p>;
//   if (isError) return <p className="text-red-500">Error: {error.message}</p>;

//   return (
//     <div>
//       <button
//         onClick={() => refetch()}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         {isFetching ? "Refreshing..." : "Refetch Posts"}
//       </button>

//       <ul className="space-y-2">
//         {posts.slice(0, 10).map((post) => (
//           <li key={post.id} className="p-3 border rounded">
//             <h2 className="font-semibold">{post.title}</h2>
//             <p className="text-gray-600">{post.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default PostsComponent;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async (page = 1) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return data;
};

function PostsComponent() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    staleTime: 5000, // data considered fresh for 5s
    cacheTime: 1000 * 60 * 5, // cache persists 5 minutes
    refetchOnWindowFocus: false, // disable auto-refetch when tab gains focus
    keepPreviousData: true, //keep old page data while fetching new page
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <button
        onClick={() => refetch()}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul className="space-y-2">
        {data?.map((post) => (
          <li key={post.id} className="p-3 border rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Pagination buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PostsComponent;
