import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "@material-ui/core/Dialog";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ReceiptIcon from "@material-ui/icons/Receipt";

import WhoPaidDialog from "./WhoPaidDialog";
import ChoosePayer from "./ChoosePayer";
import AmountPaidByPerPerson from "./AmountPaidByPerPerson";
import PerPersonShareDialog from "./PerPersonShareDialog";

import firebase from "../firebase/firebase";

const AddExpenseStyles = {
  AddExpense: {
    maxWidth: "600px",
    position: "relative",
  },
  header: {
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00b8a9",
  },
  left: {
    width: "30%",
    display: "flex",
    justifyContent: "space-between",
  },
  addFriendForExpense: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: "20px",
  },
  selectFriend: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  friendInput: {
    width: "400px",
  },
  populateFriends: {
    width: "400px",
    height: "auto",
    marginTop: "5px",
    marginLeft: "10px",
    border: "1px solid #eee",
    position: "absolute",
    top: "40px",
    right: "50px",
    backgroundColor: "#fff",
    zIndex: 5,
    boxShadow: "2px 2px 2px 2px #C9C9C9",
  },
  friend: {
    height: "40px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    paddingLeft: "10px",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },
  description: {
    display: "flex",
    alignItems: "center",
    margin: "5px 20px",
  },
  descriptionText: {
    outline: "none",
    width: "50%",
  },
  expense: {
    display: "flex",
    alignItems: "center",
    margin: "5px 20px",
  },
  expenseValue: {
    outline: "none",
    width: "50%",
  },
  split: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  splitType: {
    width: "300px",
    textAlign: "center",
    padding: "0.3rem",
    cursor: "pointer",
    boxShadow: "1px 1px 2px 1px #C9C9C9",
  },
};

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsListDialogOpen: true,
      whoPaidDialog: false,
      choosePayerDialog: false,
      AmountPaidByPerPersonDialog: false,
      perPersonShareDialog: false,

      friendsList: [],
      singlePayerName: "You",

      youPaidSplitEqual: true,
      youOweFull: false,
      theyOweFull: false,
      theyPaidSplitEqual: false,
      moreOptions: false,
      whoPaidText: "Paid by YOU and split EQUALLY",
      multiplePeople: false,
      defaultPayerState: true,
      defaultSplitState:true,

      currentExpense: {
        description: "",
        expenseAmount: 0,
        contributors: [],
        whoPaid: "",
        amountYouOwe: "",
      },
    };
  }

  componentDidMount() {
    let friendsList = [];
    firebase
      .database()
      .ref("friendsList")
      .on("value", (snapshot) => {
        friendsList = [];
        snapshot.forEach((childSnapshot) => {
          friendsList.push({
            ...childSnapshot.val(),
            id: childSnapshot.key,
          });
        });
        this.setState({ friendsList });
      });
  }

  toggleFriendsListDialog = () => {
    this.setState({ friendsListDialogOpen: !this.state.friendsListDialogOpen });
  };
  toggleChoosePayerDialog = () => {
    this.setState({ choosePayerDialog: !this.state.choosePayerDialog });
  };
  toggleWhoPaidDialog = () => {
    this.setState({ whoPaidDialog: !this.state.whoPaidDialog });
  };
  toggleAmountPaidByPerPerson = () => {
    this.setState({
      choosePayerDialog: !this.state.choosePayerDialog,
      AmountPaidByPerPersonDialog: !this.state.AmountPaidByPerPersonDialog,
    });
  };
  togglePerPersonShareDialog = () => {
    this.setState({ perPersonShareDialog: !this.state.perPersonShareDialog, defaultSplitState:false });
  };

  handleContributors = (e, users) => {
    let contributors = users.map((user) => {
      return {
        name: user.name,
        id: user.id,
        amountPaid: 0,
        expenseShare: 0,
        amountUserOwes: 0,
      };
    });
    this.setState({
      currentExpense: {
        ...this.state.currentExpense,
        contributors: [
          {
            name: "You",
            id: "abcd",
            amountPaid: 0,
            expenseShare: 0,
            amountUserOwes: 0,
          },
          ...contributors,
        ],
      },
    });
  };
  handleDescription = (e) => {
    this.setState({
      currentExpense: {
        ...this.state.currentExpense,
        description: e.target.value,
      },
    });
  };
  handleAmount = (e) => {
    let { currentExpense, defaultPayerState, defaultSplitState } = this.state;
    let expenseAmount = parseFloat(e.target.value);
    if (defaultPayerState) {
      let contributors = currentExpense.contributors.map((user) => {
        return user.id === "abcd"
          ? { ...user, amountPaid: expenseAmount }
          : { ...user };
      });
      this.setState({
        currentExpense: { ...currentExpense, contributors, expenseAmount },
      });
    } 
    if(defaultSplitState) {
     let expenseShare = expenseAmount/(currentExpense.contributors.length)
      let contributors = currentExpense.contributors.map((user) => {
        return {...user, expenseShare}
      });
      console.log(contributors)
      this.setState({
        currentExpense: { ...currentExpense, contributors, expenseAmount },
      });
    }
    else {
      this.setState({
        currentExpense: { ...currentExpense, expenseAmount },
      });
    }
  };

  handlePayer = (payer) => {
    let { contributors, expenseAmount } = this.state.currentExpense;
    let updatedContributors = contributors.map((user) => {
      return user.id === payer.id
        ? { ...user, amountPaid: expenseAmount }
        : { ...user, amountPaid: 0 };
    });
    this.setState({
      multiplePeople: false,
      singlePayerName: payer.name,
      choosePayerDialog: !this.state.choosePayerDialog,
      defaultPayerState: false,
      currentExpense: {
        ...this.state.currentExpense,
        contributors: updatedContributors,
      },
    });
  };
  resetExpense = () => {
    this.setState({
      currentExpense: {
        description: "",
        expenseAmount: 0,
        contributors: [],
        whoPaid: "",
        amountYouOwe: 0,
      },
    });
    this.props.toggleAddExpenseDialog();
  };
  handleMultiplePeople = () => {
    this.setState({
      multiplePeople: true,
      AmountPaidByPerPersonDialog: !this.state.AmountPaidByPerPersonDialog,
    });
  };
  toggleAmountPaidByPerPerson = () => {
    this.setState({
      choosePayerDialog: !this.state.choosePayerDialog,
      AmountPaidByPerPersonDialog: !this.state.AmountPaidByPerPersonDialog,
    });
  };
  handleExpensePaidShare = (contributors) => {
    this.setState({
      currentExpense: {...this.state.currentExpense, contributors},
      AmountPaidByPerPersonDialog:!this.state.AmountPaidByPerPersonDialog,
      choosePayerDialog: !this.state.choosePayerDialog
    })
  };
  handleSplit = (contributors) => {
    this.setState({
      currentExpense:{...this.state.currentExpense, contributors}
    })
  };
  handleExpenseSharing = (e) => {
    e.preventDefault()
    const updatedContributors = this.state.currentExpense.contributors.map((user) => {
      return { ...user, amountUserOwes: user.expenseShare - user.amountPaid };
    });
    let contIncOrder = updatedContributors
      .slice(1)
      .sort((a, b) => a.amountUserOwes - b.amountUserOwes);
    let contDecOrder = updatedContributors
      .slice(1)
      .sort((a, b) => b.amountUserOwes - a.amountUserOwes);
    let balanceSheet = {};
    let amountYouOwe = updatedContributors[0].amountUserOwes;
    if (amountYouOwe > 0) {
      contIncOrder.forEach(({ amountUserOwes, id }) => {
        if (amountYouOwe > Math.abs(amountUserOwes)) {
          balanceSheet = { ...balanceSheet, [id]: amountUserOwes };
          amountYouOwe -= Math.abs(amountUserOwes);
        } else {
          balanceSheet = { ...balanceSheet, [id]: -amountYouOwe };
          amountYouOwe = 0;
        }
      });
    } else if (amountYouOwe < 0) {
      contDecOrder.forEach(({ amountUserOwes, id }) => {
        if (Math.abs(amountYouOwe) > amountUserOwes) {
          balanceSheet = { ...balanceSheet, [id]: amountUserOwes };
          amountYouOwe += amountUserOwes;
        } else {
          balanceSheet = { ...balanceSheet, [id]: Math.abs(amountYouOwe) };
          amountYouOwe = 0;
        }
      });
    }
    console.log(balanceSheet)
  }
  render() {
    const { classes, addExpenseDialog } = this.props;
    const {
      friendsList,
      whoPaidDialog,
      choosePayerDialog,
      AmountPaidByPerPersonDialog,
      perPersonShareDialog,
      currentExpense,
      currentExpense: { expenseAmount, contributors },
    } = this.state;
    return (
      <div className={classes.addFriend}>
        <Dialog
          fullScreen={true}
          open={addExpenseDialog}
          aria-labelledby="Add new expense"
          aria-describedby="Add new expense"
          onBackdropClick={this.resetExpense}
          onEscapeKeyDown={this.resetExpense}
          classes={{ paper: classes.AddExpense }}
        >
          <form onSubmit={this.handleExpenseSharing}>
            <div className={classes.header}>
              <div className={classes.left}>
                <ArrowBackIcon className={classes.arrowBack} />
                <Typography variant="subtitle1">Add expense</Typography>
              </div>
              <div className={classes.right}>
                <Button type="submit">SAVE</Button>
              </div>
            </div>
            <div className={classes.Addexpense}>
              <div className={classes.addFriendForExpense}>
                <div className={classes.selectFriend}>
                  <div className={classes.text}>With you and:&nbsp;</div>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={friendsList}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    onChange={this.handleContributors}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        autoFocus={true}
                        label="Enter names, emails or phone #s"
                        required={!currentExpense.contributors.length}
                      />
                    )}
                  />
                </div>
              </div>

              <div className={classes.description}>
                <ReceiptIcon />
                <TextField
                  id="description"
                  className={classes.descriptionText}
                  placeholder="Enter a description"
                  value={currentExpense.description}
                  onChange={this.handleDescription}
                  required
                />
              </div>
              <div className={classes.expense}>
                <div>INR:&nbsp;</div>
                <TextField
                  id="description"
                  className={classes.expenseValue}
                  placeholder="0.00"
                  type="number"
                  value={currentExpense.expenseAmount}
                  onChange={this.handleAmount}
                  required
                />
              </div>
              <div className={classes.split}>
                <div>
                  Paid by
                  <span
                    className={classes.splitType}
                    onClick={this.toggleChoosePayerDialog}
                  >
                    {this.state.multiplePeople
                      ? "2+ People"
                      : `${this.state.singlePayerName}`}
                  </span>
                  and split
                  <span
                    className={classes.splitType}
                    onClick={this.togglePerPersonShareDialog}
                  >
                    EQUALLY
                  </span>
                </div>
              </div>
            </div>
          </form>
        </Dialog>

        {whoPaidDialog && (
          <WhoPaidDialog
            whoPaidDialog={whoPaidDialog}
            handlePayment={this.handlePayment}
            toggleWhoPaidDialog={this.toggleWhoPaidDialog}
            contributors={contributors}
            expenseAmount={expenseAmount}
          />
        )}
        {choosePayerDialog && (
          <ChoosePayer
            toggleChoosePayerDialog={this.toggleChoosePayerDialog}
            choosePayerDialog={choosePayerDialog}
            contributors={contributors}
            handlePayer={this.handlePayer}
            handleMultiplePeople={this.handleMultiplePeople}
          />
        )}
        {AmountPaidByPerPersonDialog && (
          <AmountPaidByPerPerson
            AmountPaidByPerPersonDialog={AmountPaidByPerPersonDialog}
            toggleAmountPaidByPerPerson={this.toggleAmountPaidByPerPerson}
            contributors={contributors}
            handleExpensePaidShare={this.handleExpensePaidShare}
            expenseAmount={expenseAmount}
          />
        )}
        {perPersonShareDialog && (
          <PerPersonShareDialog
            perPersonShareDialog={perPersonShareDialog}
            togglePerPersonShareDialog={this.togglePerPersonShareDialog}
            contributors={contributors}
            expenseAmount={expenseAmount}
            handleSplit={this.handleSplit}
          />
        )}
      </div>
    );
  }
}

export default withStyles(AddExpenseStyles)(AddExpense);