import { Container, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { db, auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

function AlphabetCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* setting up produccts */

  useEffect(() => {
    db.collection("products")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data(),
          }))
        );
      });
    setLoading(false);
  }, []);
  /* end products */
  console.log(products);

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <br />
      <h2 style={{ textAlign: "center" }}> Explore our products</h2>
      <Container style={{ marginTop: "3rem" }}>
        {/* <h2 style={{ letterSpacing: "1rem", cursor: "pointer" }}>
          {" "}
          A B C D E F G H I J K L M N O P Q R ....
        </h2> */}
        <Grid container alignItems="center" spacing={2} justify="flex-start">
          {products.map(({ id, product }) => (
            <Grid item>
              <ProductCard
                id={id}
                category={product.category}
                description={product.description}
                discount={product.discount}
                imageUrl={product.imageUrl}
                price={product.price}
                productName={product.productName}
              />{" "}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AlphabetCard;
