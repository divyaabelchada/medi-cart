import {
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  Paper,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase";
import { CheckCircleTwoTone, Delete } from "@material-ui/icons";

function Cart() {
  const [{ user, userInfo }, dispatch] = useStateValue();

  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState(0);
  const [total, setTotal] = useState(0);

  /* addresses */
  const [address, setAddress] = useState({});
  const [contact, setContact] = useState("");

  //adding address
  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    pincode: "",
  });
  const formFunction = (e) => {
    const { name, value } = e.target;
    setFormData((history) => {
      return { ...history, [name]: value };
    });
  };

  /* setting up produccts */

  const [login, setLogin] = useState(user ? false : true);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setProducts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              product: doc.data(),
            }))
          );
          setPrices(snapshot.docs.map((doc) => Number(doc.data().price)));
        });
      setLoading(false);
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, []);
  /* end products */

  useEffect(() => {
    if (products.length > 0) {
      setTotal(
        products
          .map(({ id, product }) => Number(product.price))
          .reduce((a, b) => a + b)
      );
    }
  }, [total, products]);

  console.log(formData);

  const [alert, setAlert] = useState({ value: false, msg: "" });

  const checkout = () => {
    if (
      formData.address_line_1 &&
      formData.address_line_2 &&
      contact != "" &&
      formData.pincode &&
      formData.city
    ) {
      setAlert({ value: false, msg: "" });
      setStep(2);
    } else {
      setAlert({ value: true, msg: "Please fill all data" });
    }
  };

  const confirmOrder = () => {
    if (user) {
      db.collection("orders")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userId: user.uid,
          products: products,
          amount: total,
          address: formData,
          username: userInfo.fName +" "+ userInfo.lName
        })
        .then(() => {
          db.collection("users")
            .doc(user.uid)
            .collection("orders")
            .add({
              products: products,
              amount: total,
              address: formData,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              setStep(3);
              setProducts([]);
            })
            .catch((error) => {
              setAlert({ value: false, msg: error });
            });
        })
        .catch((error) => {
          setAlert({ value: false, msg: error });
        });
    } else {
      setAlert({ value: true, msg: "Please login to continue" });
    }
  };

  const deleteItem = (doc, price) => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .doc(doc)
        .delete()
        .then(() => {
          setTotal(total - Number(price));
          alert("item deleted");
        })
        .catch((error) => {
          setAlert({ value: false, msg: error });
        });
    } else {
      setAlert({ value: true, msg: "Please login to continue" });
    }
  };

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <br />
      {alert.value ? <Alert severity="error">{alert.msg}</Alert> : <></>}
      <Container maxWidth="xl">
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={8}>
            <Paper
              elevation={0}
              className="paper"
              style={{ backgroundColor: "#fff" }}
            >
              <h2>Shopping Cart</h2> <hr />
              {login ? (
                <div>
                  Please login to continue <br />
                  <br />
                  <Link to="/login">
                    <Button variant="contained" color="primary">
                      Login
                    </Button>
                  </Link>
                </div>
              ) : products.length < 0 ? (
                <div>Your cart is empty</div>
              ) : (
                <div>
                  {products.map(({ id, product }) => (
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
                            <Link
                              to={`/product/${id}`}
                              className="product-name"
                            >
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
                        <Grid item xs={1}>
                          <IconButton
                            onClick={() => deleteItem(id, product.price)}
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <br />
                      <hr style={{ borderTop: "1px solid #f7f7f7" }} />
                    </div>
                  ))}
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper
              elevation={0}
              className="paper"
              style={{ backgroundColor: "#fff" }}
            >
              <h2>Order Summary</h2>
              {step === 1 ? (
                <Grid container alignItems="flex-start" justify="space-between">
                  <Grid item xs={8}>
                    <p>Items({products.length})</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p
                      style={{
                        borderLeft: "1px solid #cacaca",
                        paddingLeft: "1rem",
                      }}
                    >
                      <b> ₹ {total}</b>
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p>Delivery Charge</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p
                      style={{
                        borderLeft: "1px solid #cacaca",
                        paddingLeft: "1rem",
                      }}
                    >
                      <b> ₹ 50</b>
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <h3>Delivery address</h3>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="address line 1"
                        name="address_line_1"
                        onChange={formFunction}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "0.5rem" }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="address line 2"
                        name="address_line_2"
                        onChange={formFunction}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "0.5rem" }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="City"
                        name="city"
                        onChange={formFunction}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "0.5rem" }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Pincode"
                        type="number"
                        name="pincode"
                        onChange={formFunction}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "0.5rem" }}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Contact"
                        type="number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ marginTop: "0.5rem", textAlign: "center" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          checkout();
                        }}
                      >
                        Proceed to checkout
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ) : step === 2 ? (
                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-between"
                  spacing={1}
                >
                  <Grid item xs={8}>
                    <p>Items({products.length})</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p
                      style={{
                        borderLeft: "1px solid #cacaca",
                        paddingLeft: "1rem",
                      }}
                    >
                      <b> ₹ {total}</b>
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p>Delivery Charge</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p
                      style={{
                        borderLeft: "1px solid #cacaca",
                        paddingLeft: "1rem",
                      }}
                    >
                      <b> ₹ 50</b>
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        confirmOrder();
                      }}
                    >
                      Complete Payment
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container alignItems="flex-start" justify="center">
                  <Grid item xs={5}>
                    <CheckCircleTwoTone
                      style={{ fontSize: "5rem", color: "green" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ marginTop: "0.5rem", textAlign: "center" }}
                  >
                    <Link to="/profile">
                      <Button variant="contained" color="primary">
                        Check order Details
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <br />
    </div>
  );
}

export default Cart;
