// src/components/NewPostForm.jsx
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function NewPostForm({ onAddPost }) {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!caption || !imageUrl) return; // Simple validation

    onAddPost({ caption, imageUrl });

    // Clear the form
    setCaption("");
    setImageUrl("");
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create a New Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            label="Caption"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Post
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default NewPostForm;
