import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

const AmountPaidByPerPersonStyles = {
  dialog: {
    width: "400px",
    height: "auto",
    display: "flex",
    padding: "0rem 1rem 2rem 1rem",
  },
  header: {
    textAlign: "center",
    color: "#777",
    marginTop: "1rem",
  },
  avatar: {
    width: "35px !important",
    height: "35px !important",
    borderRadius: "50%",
    backgroundImage: `url("https://bit.ly/2UhwGb4")`,
    border: "3px solid #00b8a9",
    marginRight: "10px",
  },
  payer: {
    display: "flex",
    justifyContent: "space-between",
  },
  payerInfo: {
    display: "flex",
    alignItems: "center",
    margin: "0.8rem 0rem",
  },
  shareInfo: {
    display: "flex",
    alignItems: "center",
  },
  share: {
    width: "3rem",
  },
  currency: {
    paddingTop: "0.8rem",
    marginRight: "1rem",
  },
  okay: {
    margin: "1rem 1rem 0rem ",
    color: "#32CD32",
    cursor: "pointer",
    width: "3rem",
    fontWeight: "bold",
  },
  amountLeft: {
    textAlign: "center",
  },
  warning: {
    color: "#ffa50a",
  },
};

class AmountPaidByPerPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localContributors: this.props.contributors,
      totalAmount: 0,
    };
  }
  handlePaidValue = (e, payer) => {
    let amountPaid = e.target.value === "" ? 0 : parseFloat(e.target.value);
    console.log(amountPaid)
    const { localContributors: contributors } = this.state;
    let localContributors = contributors.map((contri) =>
      contri.id === payer.id ? { ...payer, amountPaid } : contri
    );
    let totalAmount = localContributors.reduce(
      (prev, next) => prev + next.amountPaid,
      0
    );
    //console.log(totalAmount);
    this.setState({ localContributors, totalAmount });
  };
  render() {
    const {
      classes,
      AmountPaidByPerPersonDialog,
      toggleAmountPaidByPerPerson,
      handleExpensePaidShare,
      expenseAmount,
    } = this.props;
    const { localContributors, totalAmount } = this.state;
    console.log(this.state.totalAmount);
    return (
      <div className={classes.amountPaid}>
        <Dialog
          open={AmountPaidByPerPersonDialog}
          aria-labelledby="Amount paid by each person in the expense"
          aria-describedby="Amount paid by each person in the expense"
          onBackdropClick={toggleAmountPaidByPerPerson}
          onEscapeKeyDown={toggleAmountPaidByPerPerson}
          classes={{ paper: classes.dialog }}
        >
          <div>
            <div className={classes.header}>Enter each person's share</div>
            {localContributors.map((payer) => {
              return (
                <div key={payer.id} className={classes.payer}>
                  <div className={classes.payerInfo}>
                    <div className={classes.avatar}></div>
                    <div className={classes.name}>{payer.name}</div>
                  </div>
                  <div className={classes.shareInfo}>
                    <div className={classes.currency}>INR</div>
                    <TextField
                      onChange={(e) => this.handlePaidValue(e, payer)}
                      className={classes.share}
                      type="number"
                      placeholder="0"
                      value={payer.amountPaid}
                    />
                  </div>
                </div>
              );
            })}
            <div className={classes.amountLeft}>
              <div
                className={
                  (classes.amountInfo,
                  expenseAmount - totalAmount < 0 && classes.warning)
                }
              >
                Total: INR {totalAmount ? totalAmount : 0} of INR&nbsp;
                {expenseAmount ? expenseAmount : 0}
              </div>
              <div>
                INR{" "}
                {totalAmount > 0 ? expenseAmount - totalAmount : expenseAmount}&nbsp;
                left
              </div>
            </div>
            <div
              className={classes.okay}
              onClick={() => handleExpensePaidShare(localContributors)}
            >
              OK
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(AmountPaidByPerPersonStyles)(AmountPaidByPerPerson);
