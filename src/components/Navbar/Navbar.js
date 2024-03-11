import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.scss";

function Navbar() {
  let userId = 5;
  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"left"  }}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link className="nav-link" to={{ pathname: "/users/" + userId }}>
                User
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
