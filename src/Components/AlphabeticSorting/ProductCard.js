import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 400,
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
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button fullWidth size="small" color="primary" variant="outlined">
          Add to cart
        </Button>
        <Button fullWidth size="small" color="primary" variant="contained">
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}
