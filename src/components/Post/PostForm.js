import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Link,
  OutlinedInput,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
function PostForm(props) {
  const { userId, userName, refreshPost } = props;

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, userId: userId, text: text }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPost();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={isSent}
        autoHideDuration={600}
        message="Kayıt başarılı bir şekilde gerçekleşti."
        style={{  backgroundColor: green[600] }}
      />
      <Card sx={{ width: 800, margin: "20px" }}>
        <CardHeader
          avatar={
            <Link className="nav-link" to={{ pathname: "/users/" + userId }}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            ></OutlinedInput>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {
              <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Text"
                inputProps={{ maxLength: 250 }}
                fullWidth
                value={text}
                onChange={(i) => {
                  handleText(i.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit}
                    >
                      Post
                    </Button>
                  </InputAdornment>
                }
              ></OutlinedInput>
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
