import { Button, Container, Grid, Paper, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase";

function Profile() {
  const [{ user }, dispatch] = useStateValue();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              order: doc.data(),
            }))
          );
        });
      setLoading(false);
      //login
    } else {
      //
    }
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <h2 style={{ textAlign: "center" }}>Your Orders</h2>
        <br />
        {orders.map(({ id, order }) => (
          <div>
            <div
              id="header"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f5f5f5",
                borderTopRightRadius: "1rem",
                borderTopLeftRadius: "1rem",
              }}
            >
              <Grid container alignItems="center" justify="space-between">
                <Grid item xs={6}>
                  <h3> Order Id #{id}</h3>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}>
                  <h3> Total: {order.amount}</h3>
                </Grid>
              </Grid>
            </div>
            <Paper>
              {order.products.map(({ id, product }) => (
                <div>
                  <Grid container alignItems="flex-start" spacing={1}>
                    <Grid item xs={2}>
                      <Link to={`/product/${id}`} className="product-name">
                        <img
                          src={product.imageUrl}
                          style={{
                            width: "100%",
                            maxHeight: "6rem",
                            objectFit: "contain",
                          }}
                        />
                      </Link>
                    </Grid>
                    <Grid item xs={7}>
                      <p style={{ margin: 0 }}>
                        <Link to={`/product/${id}`} className="product-name">
                          <big>{product.productName}</big> <br />{" "}
                        </Link>
                        <small> {product.description} </small>
                      </p>
                      <p>Qty: {1}</p>
                    </Grid>
                    <Grid item xs={2}>
                      <p>
                        <b>₹ {product.price} </b>
                      </p>
                    </Grid>
                  </Grid>
                  <br />
                  <hr style={{ borderTop: "1px solid #f7f7f7" }} />
                </div>
              ))}
            </Paper>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Profile;
