import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import CropFreeIcon from "@material-ui/icons/CropFree";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SettingsIcon from "@material-ui/icons/Settings";


const userInfoStyles = {
    userInfo: {
      height: "20vh",
      backgroundImage: `url("https://bit.ly/2DW30uR")`
    },
    row1: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "10px",
      marginBottom: "15px"
    },
    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundImage: `url("https://bit.ly/2UhwGb4")`,
      border: "3px solid #00b8a9",
      marginLeft: "15px"
    },
    icon: {
      marginRight: "10px",
      display: "flex",
      alignItems: "center"
    },
    row2: {
      marginLeft: "10px"
    }
  };
  
  function UserInfoComp(props) {
    const { classes } = props;
    return (
      <div className={classes.userInfo}>
        <div className={classes.row1}>
          <div className={classes.avatar} />
          <div className={classes.icon}>
            <CropFreeIcon />
          </div>
        </div>
        <div className={classes.row2}>
          <div className={classes.name}>Rahul Nayak</div>
          <div className="emailId">rahulnayak@electroons.com</div>
        </div>
      </div>
    );
  }
  
  const UserInfo = withStyles(userInfoStyles)(UserInfoComp);
  
  const proVersionStyles = {
    proVersion: {
      height: "22vh",
      backgroundColor: "#eee",
      padding: "0px 7px"
    },
    proDetails: {
      display: "flex"
    },
    icon: {
      width: "20px",
      marginRight: "5px",
      marginTop: "22px",
      color: "#4a266c"
    },
    details: {
      fontSize: "12px",
      padding: "10px 10px 0px 10px"
    },
    title: {
      fontWeight: "bold",
      marginBottom: 0
    },
    sub: {
      marginTop: "5px"
    },
    button: {
      marginLeft: "35px"
    }
  };
  
  function ProVersionComp(props) {
    const { classes } = props;
    return (
      <div className={classes.proVersion}>
        <div className={classes.proDetails}>
          <div className={classes.icon}>
            <MonetizationOnIcon />
          </div>
          <div className={classes.details}>
            <p className={classes.title}>Get Go-Dutch Pro!</p>
            <p className={classes.sub}>
              Subscribe to Go-Dutch Pro for receipt, scanning, no ads, currency
              conversion, charts, search and more.
            </p>
          </div>
        </div>
        <div className={classes.button}>
          <Button variant="contained" color="secondary">
            learn more
          </Button>
        </div>
      </div>
    );
  }
  
  const ProVersion = withStyles(proVersionStyles)(ProVersionComp);
  
  const optionsMenuItemStyles = {
    menuItem: {
      display: "flex",
      margin: "5px 0px 10px 20px",
      alignItems: "center",
      color: "#757575",
      cursor: "pointer",
      height: "5vh"
    },
    icon: {
      marginRight: "20px"
    }
  };
  
  function optionsMenuItemComp(props) {
    const { classes } = props;
    return (
      <div className={classes.menuItem}>
        <div className={classes.icon}>{props.icon}</div>
        <div className="text">{props.text}</div>
      </div>
    );
  }
  
  const OptionsMenuItem = withStyles(optionsMenuItemStyles)(optionsMenuItemComp);  


const appInfoStyles = {
    appInfo: {
      margin: "40px 0px 0px 25px",
      color: "#757575",
      fontSize: "12px"
    },
    icon: {
      fontSize: "11px",
      color: "red"
    },
    para1: {
      marginBottom: "0px"
    },
    para2: {
      marginTop: "0px"
    }
  };
  
  function AppInfoComp(props) {
    const { classes } = props;
    return (
      <div className={classes.appInfo}>
        <p className={classes.para1}>
          Made with <FavoriteIcon className={classes.icon} /> somewhere in India.
        </p>
        <p className={classes.para2}>
          Free to use, just give credit where due :P
        </p>
      </div>
    );
  }
  
  const AppInfo = withStyles(appInfoStyles)(AppInfoComp);

const optionsDialogStyles = {
    fullDialog: {
      maxHeight: "100vh",
      minHeight: "100vh",
      position: "relative",
      right: "149px",
      width: "300px"
    },
    content: {
      outline: "none",
      minHeight: "100vh"
    },
    menu: {
      marginTop: "20px"
    }
  };
  
  function OptionsDialog(props) {
    const { classes } = props;
    return (
      <Dialog
        open={props.optionsDialog}
        aria-labelledby="simple-Dialog-title"
        aria-describedby="simple-Dialog-description"
        onBackdropClick={props.toggleOptionsDialog}
        onEscapeKeyDown={props.toggleOptionsDialog}
        classes={{ paper: classes.fullDialog }}
      >
        <div className={classes.content}>
          <UserInfo />
          <ProVersion />
          <div className={classes.menu}>
            <OptionsMenuItem text="Home" icon={<HomeIcon />} />
            <OptionsMenuItem text="Settings" icon={<SettingsIcon />} />
            <OptionsMenuItem text="Scan code" icon={<CropFreeIcon />} />
            <OptionsMenuItem text="Rate Go-Dutch" icon={<RateReviewIcon />} />
            <OptionsMenuItem text="Contact us" icon={<MailIcon />} />
            <OptionsMenuItem text="Log out" icon={<ExitToAppIcon />} />
            <AppInfo icon={<FavoriteIcon />} />
          </div>
          <div className={classes.menu} />
        </div>
      </Dialog>
    );
  }
  
  export default withStyles(optionsDialogStyles)(OptionsDialog);
  