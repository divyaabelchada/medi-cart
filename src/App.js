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
              style={{ backgroundColor: "#fafafa" }}
            >
              <Grid item>
                <NavLink to="/admin-login">Vendor Login</NavLink>
              </Grid>
              <Grid item>About us</Grid>
              <Grid item>Contact us</Grid>
            </Grid>
          </div>
          <Container>
            <Navbar />
          </Container>

          <Switch>
            <Route path="/profile">
              <div></div>
            </Route>
            <Route path="/cart">
              <div></div>
            </Route>
            <Route path="/medicines-page">
              <AlphabetCard />
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
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
