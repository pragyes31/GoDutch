import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import {MenuItem, FormControl, Select, InputLabel} from "@material-ui/core";

const PerPersonShareDialogStyles = {
  dialog: {
    width: "400px",
    height: "auto",
    display: "flex",
    padding: "0rem 1rem 2rem 1rem",
  }
};

class PerPersonShareDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 
  render() {
    const {classes} = this.props;
    const {  } = this.state;
    console.log(this.state.totalAmount);
    return (
      <div className={classes.perPersonShare}>
        <Dialog
          open={perPersonShareDialog}
          aria-labelledby="Each person's share in the expense"
          aria-describedby="Each person's share in the expense"
          onBackdropClick={togglePerPersonShareDialog}
          onEscapeKeyDown={togglePerPersonShareDialog}
          classes={{ paper: classes.dialog }}
        >
          
        </Dialog>
      </div>
    );
  }
}

export default withStyles(PerPersonShareDialogStyles)(PerPersonShareDialog);
