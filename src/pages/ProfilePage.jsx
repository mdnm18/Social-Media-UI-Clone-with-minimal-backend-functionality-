// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// This component receives all posts as a prop from App.jsx
function ProfilePage({ posts }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // 1. Fetch the user profile from your backend API
        const response = await fetch("http://localhost:5000/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const userProfile = await response.json();
        setProfile(userProfile);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []); // Empty dependency array ensures this runs only once

  // 2. Show a spinner while loading or if the profile hasn't been set
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

  if (!profile) {
    return <Typography>Could not load profile.</Typography>;
  }

  // Filter posts to only show ones by the current user
  const userPosts = posts.filter(
    (post) => post.user.username === profile.username
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Profile Header */}
      <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
        <Grid item>
          <Avatar src={profile.avatarUrl} sx={{ width: 150, height: 150 }} />
        </Grid>
        <Grid item>
          <Typography variant="h5">{profile.username}</Typography>
          <Typography variant="body1" color="text.secondary">
            {profile.bio}
          </Typography>
        </Grid>
      </Grid>

      {/* Posts Grid */}
      <Grid container spacing={1}>
        {userPosts.map((post) => (
          <Grid item xs={4} key={post.id}>
            <Box
              component="img"
              sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
              src={post.imageUrl}
              alt={`Post by ${post.user.username}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProfilePage;
