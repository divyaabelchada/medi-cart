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
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton variant="rect" widht={"100%"} height={200} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Curcumin 30 Tablets
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Ideal for cardiovascular health and dermatological disorders. Used
            as an immunity booster.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to cart
        </Button>
        <Button size="small" color="primary" variant="contained">
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}
