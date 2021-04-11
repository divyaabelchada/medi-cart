import { Grid } from "@material-ui/core";
import React from "react";
import ProductCard from "./ProductCard";

function AlphabetCard() {
  return (
    <div>
      <h2> &nbsp; &nbsp;A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</h2>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default AlphabetCard;
