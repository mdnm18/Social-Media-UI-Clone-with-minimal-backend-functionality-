// src/App.jsx
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Routes, Route, Link } from "react-router-dom";

import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsResponse, userResponse] = await Promise.all([
          fetch("http://localhost:5000/api/posts"),
          fetch("http://localhost:5000/api/user"), // Fetch user from the backend
        ]);

        if (!postsResponse.ok || !userResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const fetchedPosts = await postsResponse.json();
        const userProfile = await userResponse.json();

        setPosts(fetchedPosts);
        setCurrentUser(userProfile);
      } catch (err) {
        setError("Failed to load data from server.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLikeToggle = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleAddPost = async (postData) => {
    if (!currentUser) return;

    const newPostPayload = {
      user: {
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl,
      },
      imageUrl: postData.imageUrl,
      caption: postData.caption,
    };

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const createdPost = await response.json();
      // Add the new post from the server to the top of the feed
      setPosts([createdPost, ...posts]);
    } catch (err) {
      console.error("Error creating post:", err);
      // Optionally, set an error state to show a message to the user
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      );
    }

    return (
      <Routes>
        <Route
          path="/"
          element={
            <FeedPage
              posts={posts}
              onLike={handleLikeToggle}
              onAddPost={handleAddPost} // Ensure this is passed
            />
          }
        />
        <Route path="/profile" element={<ProfilePage posts={posts} />} />
      </Routes>
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Social App
            </Link>
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        {/* FIX 2: Call the renderContent function here */}
        {renderContent()}
      </Container>
    </div>
  );
}

export default App;
