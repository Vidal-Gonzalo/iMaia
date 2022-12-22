import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import UpdateInformation from "./UpdateInformation/UpdateInformation";
import UserSidebar from "./UserSidebar/UserSidebar";
import "./Settings.css";
import { useSelector } from "react-redux";

export default function Settings() {
  const userLogged = useSelector((state) => state.auth.user);

  useEffect(() => {
    document.title = "Ajustes de cuenta - iMaia";
  }, []);
  return (
    <section id="settings">
      <Grid container sx={{ marginTop: "2rem" }}>
        <Grid xs={4} item={true}>
          <UserSidebar user={userLogged} />
        </Grid>
        <Grid xs={8} item={true}>
          <UpdateInformation user={userLogged} />
        </Grid>
      </Grid>
    </section>
  );
}
