import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";

function Post(props) {
  const { postId, userId, userName, title, text } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [commentList]);

  return (
    <Card sx={{ width: 800, margin: "20px" }}>
      <CardHeader
        avatar={
          <Link className="nav-link" to={{ pathname: "/users/" + userId }}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike} aria-label="add to favorites">
          <FavoriteIcon sx={liked ? { color: "red" } : null} />
        </IconButton>
        <IconButton aria-label="share"></IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
