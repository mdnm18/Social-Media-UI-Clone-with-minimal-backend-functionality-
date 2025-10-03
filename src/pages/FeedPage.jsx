// src/pages/FeedPage.jsx
import Box from "@mui/material/Box";
import Post from "../components/Post";
import NewPostForm from "../components/NewPostForm"; // Import the form

function FeedPage({ posts, onLike, onAddPost }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 3,
      }}
    >
      {/* Add the new post form at the top */}
      <NewPostForm onAddPost={onAddPost} />

      {posts.map((post) => (
        <Post key={post.id} post={post} onLike={onLike} />
      ))}
    </Box>
  );
}

export default FeedPage;
