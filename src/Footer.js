import {
  Grid,
  TextField,
  InputAdornment,
  Input,
  ThemeProvider,
  Button,
} from "@material-ui/core";
import React from "react";
import "./Footer.css";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Facebook,
  Instagram,
  Mail,
  MailOutline,
  Pinterest,
  Twitter,
} from "@material-ui/icons";
import { colorTheme } from "./App";

function Footer() {
  return (
    <ThemeProvider theme={colorTheme}>
      <div id="footer">
        <Grid
          container
          spacing={2}
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid
            item
            xs={12}
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              textAlign: "center",
            }}
            id="logo-section"
          >
            {/* logo and copyright */}
            <h1>
              <b>
                {" "}
                <span style={{ color: "#000" }}>Medi</span>
                <span style={{ color: "green" }}>Cart</span>
              </b>
            </h1>
            <h3 style={{ color: "#a1a1a1" }}>
              {" "}
              © 2020 Copyright: Naveen Bhambhani{" "}
            </h3>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Footer;
