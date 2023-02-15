import React, { useState } from "react";
import RecentTexts from "./RecentTexts/RecentTexts";
import { searchElements } from "../../../../utils/searchElements";
import { tags } from "../../../../assets/data/Tags";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FollowingTexts from "./FollowingTexts/FollowingTexts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function HomeTabs() {
  let writingTags = searchElements.getRandomElements(tags[0].tag, 4);
  let poemTags = searchElements.getRandomElements(tags[1].tag, 4);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "2% 0 0 0",
      }}
    >
      <Box sx={{ margin: "0 0 0 2%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ fontSize: "1.2rem" }}
          TabIndicatorProps={{
            style: { background: "var(--global-primary-color)" },
          }}
        >
          <Tab label="Explorar" {...a11yProps(0)} />
          <Tab label="Seguidos" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel children={"div"} value={value} index={0}>
        <RecentTexts tags={writingTags} genre={"Escritos"} />
        <RecentTexts tags={poemTags} genre={"Poemas"} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FollowingTexts />
      </TabPanel>
    </Box>
  );
}
