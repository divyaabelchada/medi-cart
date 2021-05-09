import { Button, Container, Grid, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import firebase from "firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

function Product() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [id, setId] = useState(null);
  const [{ user, admin }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("products")
      .doc(productId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log("Document data:", doc.data());
          setId(doc.id);
          setProduct(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [productId]);

  const addToCart = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          description: product.description,
          imageUrl: product.imageUrl,
          productName: product.productName,
          price: product.price,
          category: product.category,
          id: id,
          qty: 1,
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

  console.log(product);
  return (
    <div>
      <Container maxWidth="md">
        <Paper style={{ textAlign: "center", padding: "2rem", margin: "2rem" }}>
          <img
            src={
              product
                ? product.imageUrl
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png"
            }
            style={{ height: "10rem", objectFit: "contain", width: "100%" }}
          />
          <h2> {product ? product.productName : ""} </h2> <br />
          <p> {product ? product.description : ""} </p>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToCart()}
          >
            Add to cart
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

export default Product;
