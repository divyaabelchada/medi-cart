import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useStateValue } from "../../StateProvider";
import { Button, Container, TextField } from "@material-ui/core";
import { storage, db } from "../../firebase";
import React, { useState } from "react";
import firebase from "firebase";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    margin: 20,
    maxWidth: 600,
    textAlign: "left",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
}));

function ImageUpload() {
  const [{ user, admin }, dispatch] = useStateValue();

  const classes = useStyles();

  /*  description: description,
                imageUrl: url,
                productName: productName,
                price:productPrice,
                discount:discount, */

  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const [image, setImage] = useState(null);

  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  console.log(user);

  const handleUpload = () => {
    if (admin) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress logic.
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          //complete function
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              const res = db
                .collection("products")
                .add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  description: description,
                  imageUrl: url,
                  productName: productName,
                  price: productPrice,
                  category: category,
                  seller: admin.uid,
                })
                .catch((error) => alert(error.message));
              //post image inside db
              setProgress(0);
              setImage(null);
              setDescription("");
              setProductName("");
              setProductPrice("");
              setCategory("");
            });
        }
      );
    } else {
      alert("Please login to continue");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Upload product
          </Typography>
        </CardContent>
        <Container className={classes.form}>
          <form className={classes.form}>
            <progress
              style={{ width: "100%", height: 30 }}
              value={progress}
              max="100"
            />
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Enter product details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Enter product price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Category
              </InputLabel>
              <Select
                style={{ width: "100%" }}
                id="standard-basic"
                label="Category"
                value={category}
                onChange={handleCategory}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"diabetes"}>Diabetes</MenuItem>
                <MenuItem value={"skin-care"}>Skin Care</MenuItem>
                <MenuItem value={"hair-care"}>Hair Care</MenuItem>
                <MenuItem value={"stomach-care"}>Stomach Care</MenuItem>
                <MenuItem value={"orthod-care"}>Ortho Care</MenuItem>
                <MenuItem value={"health-care"}>Health Care</MenuItem>
                <MenuItem value={"cardiac-care"}>Cardiac Care</MenuItem>
                <MenuItem value={"eye-care"}>Eye Care</MenuItem>
              </Select>
            </FormControl>

            <br></br>
            <input
              style={{ marginTop: 20 }}
              type="file"
              onChange={handleChange}
            />
            <br></br>
            <Button
              style={{ marginTop: 20 }}
              onClick={handleUpload}
              variant="contained"
              color="primary"
              disableElevation
            >
              Upload
            </Button>
          </form>
        </Container>
      </Card>
    </Container>
  );
}

export default ImageUpload;

{
  /* <div>
<h4> Image upload section </h4>
<progress value={progress} max="100" />
<input
  type="text"
  placeholder="Enter a caption"
  onChange={(event) => setCaption(event.target.value)}
/>
<input type="file" onChange={handleChange} />
<Button onClick={handleUpload}>Upload</Button>
{/*I want to have the following*/
}
{
  /* caption input */
}
{
  /* file picker - to pic an image */
}
{
  /* Location - later */
}
{
  /* Post button */
}
//</div> */}
