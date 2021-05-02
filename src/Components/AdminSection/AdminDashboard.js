import React from "react";
import ImageUpload from "./ImageUpload";
import { db, auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { Grid, Paper } from "@material-ui/core";

function AdminDashboard() {
  const [{ user, admin, adminInfo }, dispatch] = useStateValue();

  console.log(adminInfo);
  return (
    <div>
      {!admin ? (
        <div>Invalid access</div>
      ) : (
        <Grid container alignItems="flex-start" justify="center">
          <Grid item xs={4}>
            <Paper style={{ padding: "2rem", margin: "2rem" }}>
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
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <ImageUpload />
          </Grid>{" "}
        </Grid>
      )}
    </div>
  );
}

export default AdminDashboard;
