import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "../Home/Home.scss";
import { Container } from "@mui/material";
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPost = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPost();
  }, [postList]);

  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container fixed className="container">
        <PostForm
          userId={1}
          userName={"sadasd"}
          refreshPost={refreshPost}
        />
        {postList.map((post) => (
          <Post
          postId={post.id}
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
          ></Post>
        ))}
      </Container>
    );
  }
}

export default Home;
