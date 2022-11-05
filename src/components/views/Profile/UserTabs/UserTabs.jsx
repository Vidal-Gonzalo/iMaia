import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import "./UserTabs.css";
import { iMaiaApi } from "../../../../api/iMaiaApi";
import UserWritings from "./UserTexts/UserTexts";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && <Box sx={{ pl: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UserTabs({ user }) {
  const [value, setValue] = useState(0);
  const [writings, setWritings] = useState([]);
  const [poems, setPoems] = useState([]);
  const [savedTexts, setSavedTexts] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    const loadUserTexts = async (user) => {
      const response = await iMaiaApi.getTextsByUsername(user.username);
      const texts = response.data;
      let writingsAux = [];
      let poemsAux = [];
      for (const text of texts) {
        if (text.genre === "writings") {
          writingsAux.push(text);
        } else if (text.genre === "poems") {
          poemsAux.push(text);
        }
      }
      setWritings(writingsAux);
      setPoems(poemsAux);
    };
    const loadUserSavedTexts = async (user) => {
      const response = await iMaiaApi.getUserSavedTexts(user.username);
      const texts = response.data;
      if (texts !== undefined) {
        setSavedTexts(texts);
      }
    };

    if (user !== undefined && !isCancelled) {
      loadUserTexts(user);
      loadUserSavedTexts(user);
    }
    return () => {
      isCancelled = true;
    };
  }, [user]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
        marginTop: "1em",
      }}
    >
      <Grid container style={{ marginTop: "2em" }}>
        <Grid xs={2} item={true}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <Tab label="Mis escritos" {...a11yProps(0)} />
            <Tab label="Mis poemas" {...a11yProps(1)} />
            <Tab label="Mis textos guardados" {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Grid xs={10} item={true}>
          {" "}
          <TabPanel value={value} index={0}>
            <UserWritings texts={writings} type={"escritos"} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserWritings texts={poems} type={"poemas"} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UserWritings texts={savedTexts} type={"textos guardados"} />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
