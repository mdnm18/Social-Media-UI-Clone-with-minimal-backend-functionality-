// src/components/Post.jsx
// No more useState needed here!
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// It now receives the post data and the onLike function from its parent
function Post({ post, onLike }) {
  return (
    <Card sx={{ maxWidth: 600, mb: 3, width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar src={post.user.avatarUrl} aria-label="user-avatar">
            {post.user.username.charAt(0)}
          </Avatar>
        }
        title={post.user.username}
        subheader={new Date(post.timestamp).toLocaleDateString()}
      />
      <CardMedia
        component="img"
        height="500"
        image={post.imageUrl}
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* The button now calls the function passed down from App.jsx */}
        <IconButton
          aria-label="add to favorites"
          onClick={() => onLike(post.id)}
        >
          {post.isLiked ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography variant="body2">{post.likes} likes</Typography>
      </CardActions>
    </Card>
  );
}

export default Post;
