import React from "react";
import { Container, Grid } from "@material-ui/core";
import Banner from "../Banner/Banner";
import Cards from "../MediCards/Cards";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Banner />
      <br /> <br />
      <Container>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6} md={3}>
            <Link to="/medicines-page?diabetes">
              <Cards
                title="Diabetes Care"
                src="data:image/jpeg;base64,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"
              />
            </Link>
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards
              title="Cardiac Care"
              src="https://cardiacsolutions.net/blog/wp-content/uploads/2017/10/cardiac_red_heart.jpg"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards
              title="Skin Care"
              src="https://theskincareedit.com/.image/t_share/MTc2MTA1NTAyMjM5ODkyOTA1/what-is-serum-1.jpg"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards
              title="Hair Care"
              src="https://www.lakme-academy.com/blog/wp-content/uploads/2020/01/n-Winter-care.jpg"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards
              title="Stomach Care"
              src="https://images.herzindagi.info/image/2019/Sep/why-healthy-gut.jpg"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards
              title="Ortho Care"
              src="https://content3.jdmagicbox.com/comp/chennai/k9/044pxx44.xx44.130307202934.r3k9/catalogue/aswin-ortho-care-clinic-mogappair-west-chennai-orthopaedic-doctors-183a09d.jpeg?clr=064c60"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards
              title="Eye Care"
              src="https://post.healthline.com/wp-content/uploads/2020/09/dry-eyes-home-remedies_thumb-1-732x549.jpg"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Cards
              title="Health Care"
              src="https://cardiacsolutions.net/blog/wp-content/uploads/2017/10/cardiac_red_heart.jpg"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
