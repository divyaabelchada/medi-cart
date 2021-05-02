import { Container, Grid } from "@material-ui/core";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";
import Cards from "./Components/MediCards/Cards";
import Home from "./Components/Pages/Home";
//routing
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminSignUp from "./Components/AdminLogin/AdminSignUp";
import AlphabetCard from "./Components/AlphabeticSorting/AlphabetCard";
import Footer from "./Footer";
import ImageUpload from "./Components/AdminSection/ImageUpload";
import { db, auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import Cart from "./Components/Pages/Cart";
import CategoryProducts from "./Components/AlphabeticSorting/CategoryProducts";
import Profile from "./Components/Pages/Profile";
import UserLogin from "./Components/UserLogin/UserLogin";
import UserSignUp from "./Components/UserLogin/UserSignUp";

export const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#0000ff",
    },
  },
});

function App() {
  const [{ user, admin }, dispatch] = useStateValue();

  return (
    <div className="App">
      <ThemeProvider theme={colorTheme}>
        <Router>
          <div>
            <Grid
              container
              alignItems="center"
              justify="flex-end"
              spacing={3}
              style={{
                backgroundColor: "#fafafa",
                width: "100%",
                overflowX: "hidden",
              }}
            >
              <Grid item>
                <NavLink to="/admin-login">
                  {" "}
                  {!admin ? <p> Vendor Login</p> : <p> AdminDashboard </p>}{" "}
                </NavLink>
              </Grid>
              <Grid item>About us</Grid>
              <Grid item>Contact us</Grid>
            </Grid>
          </div>
          <Container>
            <Navbar />
          </Container>

          <Switch>
            <Route path="/user-login">
              {!user ? (
                <UserLogin />
              ) : (
                <div>
                  <Profile />
                </div>
              )}
            </Route>
            <Route path="/profile">
              {!user ? (
                <AdminLogin />
              ) : (
                <div>
                  <Profile />
                </div>
              )}
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/medicines-page/:category">
              <CategoryProducts />
            </Route>
            <Route path="/medicines-page">
              <AlphabetCard />
            </Route>
            <Route path="/user-signup">
              <UserSignUp />
            </Route>
            <Route path="/user-login">
              <UserLogin />
            </Route>
            <Route path="/admin-signup">
              <AdminSignUp />
            </Route>
            <Route path="/admin-login">
              <AdminLogin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
