import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";


const filterDialogStyles = {
    Dialog: {
      width: "280px",
      height: "150px",
      position: "relative",
      bottom: "130px",
      left: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "left",
      flexDirection: "column"
    },
    dialogChild: {
      height: "100%",
      paddingLeft: "10px",
      backgroundColor: "lightgrey",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "left",
      flexDirection: "column",
      "&:hover": {
        backgroundColor: "grey",
        color: "white"
      }
    }
  };
  
  function FilterDialog(props) {
    const { classes } = props;
    return (
      <Dialog
        open={props.filterDialog}
        aria-labelledby="Add New friend Dialog"
        aria-describedby="Add New friend Dialog"
        onBackdropClick={() => props.toggleDialog("filterDialog")}
        onEscapeKeyDown={() => props.toggleDialog("filterDialog")}
        classes={{ paper: classes.Dialog }}
      >
        <Typography className={classes.dialogChild}>
          All {props.tabName}
        </Typography>
        <Typography className={classes.dialogChild}>
          {props.tabName} with outstanding balances
        </Typography>
        <Typography className={classes.dialogChild}>
          {props.tabName} you owe
        </Typography>
        <div className={classes.dialogChild}>
          {props.tabName === "friends" ? "friends who" : "groups that"} owe you
        </div>
      </Dialog>
    );
  }
  
 export default withStyles(filterDialogStyles)(FilterDialog);
  