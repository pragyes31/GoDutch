import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";


const threeDotsPopoverStyles = {
    Dialog: {
      width: "150px",
      height: "80px"
    },
    content: {
      height: "80px",
      backgroundColor: "rgb(245, 234, 234)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      outline: "none"
    },
    contentChild: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40px",
      width: "100%",
      cursor: "pointer",
      "&:hover": {
        color: "#fff",
        backgroundColor: "#00b8a9"
      }
    }
  };
  
  function ThreeDotsPopover(props) {
    const { classes } = props;
    return (
      <Popover
        open={props.anchorEl != null}
        aria-labelledby="simple-Dialog-title"
        aria-describedby="simple-Dialog-description"
        anchorEl={props.anchorEl}
        onBackdropClick={props.handle3DotsClose}
        classes={{ paper: classes.Dialog }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <div className={classes.content}>
          <Typography
            variant="subtitle1"
            className={classes.contentChild}
            onClick={props.toggleThreeDots}
          >
            Add new friend
          </Typography>
          <Typography variant="subtitle1" className={classes.contentChild}>
            Create a group
          </Typography>
        </div>
      </Popover>
    );
  }
  
  export default withStyles(threeDotsPopoverStyles)(ThreeDotsPopover);
  