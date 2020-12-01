import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";


const headerStyles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "40px",
      padding: "0px 10px",
      backgroundColor: "#00b8a9"
    },
    hamburger: {
      cursor: "pointer",
      width: "25px",
      color: "#ffffff"
    },
    title: {
      color: "#fff"
    },
    dots: {
      position: "relative",
      color: "#fff",
      fontSize: "1.2em",
      cursor: "pointer"
    }
  };
  
  function Header(props) {
    const { classes } = props;
    return (
      <div className={classes.header}>
        <MenuIcon
          className={classes.hamburger}
          onClick={props.toggleOptionsDialog}
        />
        <Typography variant="h6" className={classes.title}>
          Go-Dutch App
        </Typography>
        <div>
          <MoreVertIcon
            onClick={props.toggle3DotsDialog}
            className={classes.dots}
          />
        </div>
      </div>
    );
  }
  
  export default withStyles(headerStyles)(Header);
  