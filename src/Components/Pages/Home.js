import React from "react";
import { Container, Grid } from "@material-ui/core";
import Banner from "../Banner/Banner";
import Cards from "../MediCards/Cards";

function Home() {
  return (
    <div>
      <Banner />
      <br /> <br />
      <Container>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6} md={3}>
            <Cards />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
