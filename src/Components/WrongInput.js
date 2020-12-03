
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

const wrongInputStyles = {
    alertDialogBox: {
      width: "300px",
      height: "150px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around"
    },
    message: {
      padding: "10px",
      textAlign: "center",
      marginTop: "1rem"
    },
    close: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "1rem"
    }
  };
  
  function WrongInput(props) {
    const { classes } = props;
    return (
      <Dialog
        open={props.wrongInputDialog}
        aria-labelledby="Wrong phone number or email id"
        aria-describedby="Wrong phone number or email id"
        onBackdropClick={props.toggleWrongInput}
        onEscapeKeyDown={props.toggleWrongInput}
        classes={{ paper: classes.alertDialogBox }}
      >
        <Typography className={classes.message}>
          Invalid phone number or email id.
        </Typography>
        <div className={classes.close}>
          <Button color="primary" onClick={props.toggleWrongInput}>
            OK
          </Button>
        </div>
      </Dialog>
    );
  }
  
export default withStyles(wrongInputStyles)(WrongInput);
  