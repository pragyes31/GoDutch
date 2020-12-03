import React from "react";

import FriendsTab from './FriendsTab'
import GroupsTab from './GroupsTab'

import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


const navBarStyles = {
    nav: {
      backgroundColor: "#00b8a9"
    }
  };
  
  function NavBar(props) {
    const [value, setValue] = React.useState(0);
    const { classes } = props;
    const handleTabs = (event, val) => {
      setValue(val);
    };
    return (
      <div>
        <AppBar className={classes.nav} position="static">
          <Tabs
            value={value}
            onChange={handleTabs}
            aria-label="simple tabs example"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <FriendsTab tabName="friends" friendsList={props.friendsList} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GroupsTab tabName="groups" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <GroupsTab />
          </TabPanel>
        </AppBar>
      </div>
    );
  }
  
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <div>{children}</div>}</div>;
  }
  
  export default withStyles(navBarStyles)(NavBar);
  