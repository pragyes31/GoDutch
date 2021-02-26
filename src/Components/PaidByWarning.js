import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

const paidByWarningStyles = {
  warning: {
    margin: "0.5rem 1rem",
  },
  ok: {
      width:"2rem",
    textAlign: "right",
    margin: "3rem 1rem 0 0",
    color: "#009900",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

const PaidByWarning = (props) => {
  const { classes, togglePaidByWarning, paidByWarning } = props;
  return (
    <div className={classes.warning}>
      <Dialog
        open={paidByWarning}
        aria-labelledby="Expense don't add up"
        aria-describedby="Expense don't add up"
        onBackdropClick={togglePaidByWarning}
        onEscapeKeyDown={togglePaidByWarning}
        classes={{ paper: classes.dialog }}
      >
        <div className={classes.warning}>
          <h3 className={classes.error}>Error</h3>
          <div className={classes.text}>
            The payment value do not add up to the total cost of INR{" "}
            {props.expenseAmount}
          </div>
          <div className={classes.ok} onClick={togglePaidByWarning}>
            OK
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default withStyles(paidByWarningStyles)(PaidByWarning);
