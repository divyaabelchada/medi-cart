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
import { Redirect, useHistory } from "react-router-dom";

import { db, auth, provider } from "../../firebase";

import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

function Navbar() {
  const [{ user }, dispatch] = useStateValue();

  const [open, toggleOpen] = React.useState(false);

  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [present, setPresent] = useState(null);

  const history = useHistory();

  /* setting up produccts */

  useEffect(() => {
    db.collection("products")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().productName,
          }))
        );
      });
    setLoading(false);
  }, []);
  /* end products */
  console.log(products);

  //var fruits = ["Banana", "Orange", "Apple", "Mango"];
  //var n = fruits.includes("Banana", 0);

  const [id, setId] = useState("");

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
        <Grid item xs={6} md={4}>
          <Autocomplete
            value={value}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  title: "No data available",
                });
              }
              return filtered;
            }}
            options={products}
            getOptionLabel={(option) => {
              // e.g value selected with enter, right from the input
              return option.title;
            }}
            getOptionSelected={(option, value) =>
              option.userName === value.userName
            }
            onChange={(event, newValue) => {
              setId(newValue.id);
            }}
            handleHomeEndKeys
            renderOption={(option) => option.title}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search for medicines"
                id="search"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          {id != "" ? (
            <Link to={`/product/${id}`}>
              <IconButton>
                <Search />
              </IconButton>{" "}
            </Link>
          ) : (
            <></>
          )}
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
                <NavLink to="/user-login" activeClassName="selected">
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
