import {
  Avatar,
  Container,
  Grid,
  IconButton,
  ListItem,
} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Person, Search } from "@material-ui/icons";
import React from "react";
import "./Navbar.css";
import clsx from "clsx";

import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";
import { Link, NavLink } from "react-router-dom";

import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

function Navbar() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div id="navbar">
      <Grid container alignItems="center" justify="flex-start">
        <Grid item xs={6} md={3}>
          <NavLink to="/">
            <h1>
              <b>
                {" "}
                <span style={{ color: "#000" }}>Medi</span>
                <span style={{ color: "green" }}>Cart</span>
              </b>
            </h1>
          </NavLink>
        </Grid>
        <Grid item xs={6} md={5}>
          <TextField
            placeholder="Search for medicines"
            id="search"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton>
                    <Search />{" "}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container alignItems="center" justify="flex-end" spacing={3}>
            <Grid item>
              <NavLink to="/medicines-page" activeClassName="selected">
                <h3>Medicines</h3>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/cart" activeClassName="selected">
                <h3>Cart</h3>
              </NavLink>
            </Grid>

            <Grid item>
              <NavLink to="/profile" activeClassName="selected">
                <h3>Profile</h3>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Navbar;
