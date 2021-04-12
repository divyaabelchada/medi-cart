import { Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import "./Cards.css";

function Cards({ title }) {
  return (
    <div id="cards">
      <Paper>
        <Skeleton variant="rect" width={"100%"} height={200} />
        <h3>{title} </h3>
      </Paper>
    </div>
  );
}

export default Cards;
