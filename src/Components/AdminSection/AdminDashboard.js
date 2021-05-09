import React, {useState, useEffect} from "react";
import ImageUpload from "./ImageUpload";
import { db, auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { Grid, Paper, Card, Container } from "@material-ui/core";
import {Link} from "react-router-dom"

function AdminDashboard() {
  const [{ user, admin, adminInfo }, dispatch] = useStateValue();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin) {
      db.collection("orders")
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

  console.log(adminInfo);
  return (
    <div>
      {!admin ? (
        <div>Invalid access</div>
      ) : (
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={4}>
            <Card style={{ padding: "2rem", margin: "2rem" }} elevation={2}>
              {adminInfo.value && adminInfo.data != null ? (
                <div>
                  <h2>
                    {adminInfo.data.fName} &nbsp; {adminInfo.data.lName}{" "}
                  </h2>
                  <p>
                    email: {adminInfo.data.username} <br /> contact:{" "}
                    {adminInfo.data.contact}{" "}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </Card>
        <Card elevation={2} style={{ padding: "2rem", margin: "2rem" }}>
        <ImageUpload />
        </Card>
           
          </Grid>
          <Grid item xs={8}>
          <Container maxWidth="md">
        <h2 style={{ textAlign: "center" }}>Your Orders</h2>
        <br />
        {orders.map(({ id, order }) => (
          <div style={{marginBottom:"1rem"}}>
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
            <Paper elevation={1}>
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
              <div style={{ padding:"1rem" }}  >
                <Grid container>
                  <Grid item xs={4}>
                    <p>
                      <b>Buyer: </b> {order.username}
                    </p>
                 
                  </Grid>
                  <Grid item xs={3}>
                  <p><b>Delivery Address:</b></p>
                  </Grid>
                  <Grid item xs={5}>
                    <p>
                    {order.address.address_line_1},<br />
                    {order.address.address_line_2},<br />
                    {order.address.city}&nbsp;{order.address.pincode}.
                    </p>
                  </Grid>
                </Grid>
 
              </div>
            </Paper>
          </div>
        ))}
      </Container>
          </Grid>
         
        </Grid>
      )}
    </div>
  );
}

export default AdminDashboard;
