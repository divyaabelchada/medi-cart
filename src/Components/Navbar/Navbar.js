import {
  Avatar,
  Container,
  Grid,
  InputBase,
  IconButton,
  ListItem,
  Typography,
} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Person, Search } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import clsx from "clsx";

import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";
import { Link, NavLink } from "react-router-dom";

import { db, auth, provider } from "../../firebase";

import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

import Autocomplete from "@material-ui/lab/Autocomplete";

function Navbar() {
  const [{ user }, dispatch] = useStateValue();

  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [present, setPresent] = useState(null);

  /* setting up produccts */

  useEffect(() => {
    db.collection("products")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data(),
          }))
        );
      });
    setLoading(false);
  }, []);
  /* end products */
  console.log(products);

  //var fruits = ["Banana", "Orange", "Apple", "Mango"];
  //var n = fruits.includes("Banana", 0);

  const searchProduct = (e) => {
    setPresent(products.includes(value, 0));
    if (present) {
      alert("present");
    }
  };

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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton>
                    <Search onClick={searchProduct} />
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
              {!user ? (
                <NavLink to="/login" activeClassName="selected">
                  <h3>Login</h3>
                </NavLink>
              ) : (
                <NavLink to="/profile" activeClassName="selected">
                  <h3>Profile</h3>
                </NavLink>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Navbar;
