import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { db, auth, provider } from "../../firebase";
import firebase from "firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { Grid, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 480,
  },
});

export default function ImgMediaCard({
  id,
  category,
  description,
  discount,
  imageUrl,
  price,
  productName,
}) {
  const classes = useStyles();

  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  const [qty, setQty] = useState(1);

  const buyNow = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          description: description,
          imageUrl: imageUrl,
          productName: productName,
          price: price,
          category: category,
          id: id,
          qty: qty,
        })
        .then(() => {
          alert("Product Added Successfully!");
          history.push("/cart");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Please login to continue");
    }
  };

  const addToCart = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          description: description,
          imageUrl: imageUrl,
          productName: productName,
          price: price,
          category: category,
          id: id,
          qty: qty,
        })
        .then(() => {
          alert("Product Added Successfully!");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Please login to continue");
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/*  <Skeleton variant="rect" widht={"100%"} height={200} /> */}
        <img
          src={imageUrl}
          style={{
            height: 200,
            width: "90%",
            objectFit: "contain",
            paddingTop: "1rem",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            style={{ height: 70 }}
          >
            {productName} - Rs {price}/-
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ height: 60 }}
          >
            {description}
          </Typography>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={4}>
              Quantity
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                color="primary"
                placeholder="Quantity"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                type="number"
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          fullWidth
          size="small"
          color="primary"
          variant="outlined"
          onClick={(e) => addToCart()}
        >
          Add to cart
        </Button>
        <Button
          onClick={(e) => buyNow()}
          fullWidth
          size="small"
          color="primary"
          variant="contained"
        >
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}
