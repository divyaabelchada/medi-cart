import { Container, Grid } from "@material-ui/core";
import React from "react";
import ProductCard from "./ProductCard";

function AlphabetCard() {
  return (
    <div>
      <Container>
        <h2 style={{ letterSpacing: "1rem", cursor: "pointer" }}>
          {" "}
          A B C D E F G H I J K L M N O P Q R ....
        </h2>
        <Grid container alignItems="center" spacing={2} justify="center">
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
      </Container>
    </div>
  );
}

export default AlphabetCard;
