import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

const whoPaidDialogStyles = {
  whoPaidDialog: {},
  dialog: {
    width: "300px",
    height: "300px",
    display: "flex",
  },
  title: {
    flexGrow: 1,
    justifyContent: "center",
  },
  option: {
    cursor: "pointer",
    justifyContent: "center",
    flexGrow: 1,
    "&:hover": {
      backgroundColor: "#C9C9C9",
    },
  },
};

class WhoPaidDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes,
      whoPaidDialog,
      toggleWhoPaidDialog,
      contributors,
      expenseAmount
    } = this.props;
    return (
      <div className={classes.whoPaidDialog}>
        <Dialog
          open={whoPaidDialog}
          aria-labelledby="Modal to select who paid for the expense"
          aria-describedby="Modal to select who paid for the expense"
          onBackdropClick={toggleWhoPaidDialog}
          onEscapeKeyDown={toggleWhoPaidDialog}
          classes={{ paper: classes.dialog }}
        >
          <div className={classes.title}>How was this expense split?</div>
          <div
            className={classes.option}
            onClick={() => this.props.handlePayment("youPaidSplitEqual")}
          >
            Paid by you and split equally
          </div>
          <div
            className={classes.option}
            onClick={() => this.props.handlePayment("youOweFull")}
          >
            {expenseAmount
              ? `You owe ${contributors[0].name} INR ${expenseAmount}`
              : "You owe the full amount"}
          </div>
          <div
            className={classes.option}
            onClick={() => this.props.handlePayment("theyOweFull")}
          >
            {expenseAmount
              ? `${contributors[0].name} owes you INR ${expenseAmount}`
              : "They owe the full amount"}</div>
          <div
            className={classes.option}
            onClick={() => this.props.handlePayment("theyPaidSplitEqual")}
          >
                        {expenseAmount
              ? `Paid by ${contributors[0].name} and split equally`
              : "Paid by the other person and split equally"}
            
          </div>
          <div
            className={classes.option}
            onClick={() => this.props.handlePayment("moreOptions")}
          >
            More options
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(whoPaidDialogStyles)(WhoPaidDialog);
