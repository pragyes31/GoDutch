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
    this.setState({ perPersonShareDialog: !this.state.perPersonShareDialog });
  };

  handleContributors = (e, users) => {
    let contributors = users.map((user) => {
      return {
        name: user.name,
        id: user.id,
        amountPaid: "",
        expenseShare: "",
        amountUserOwes: "",
      };
    });
    this.setState({
      currentExpense: {
        ...this.state.currentExpense,
        contributors: [
          {
            name: "You",
            id: "abcd",
            amountPaid: this.state.currentExpense.expenseAmount,
            expenseShare: "",
            amountUserOwes: "",
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
    this.setState({
      currentExpense: {
        ...this.state.currentExpense,
        expenseAmount: parseFloat(e.target.value),
      },
    });
  };

  handlePayer = (payer) => {
    let { contributors, expenseAmount } = this.state.currentExpense;
    let updatedContributors = contributors.map((user) => {
      return user.id === payer.id
        ? { ...user, amountPaid: expenseAmount }
        : { ...user, amountPaid: 0 };
    });
    console.log(updatedContributors);
    this.setState({
      multiplePeople: false,
      singlePayerName: payer.name,
      choosePayerDialog: !this.state.choosePayerDialog,
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
    console.log(contributors);
  };
  handleSplit = (perPersonShareList) => {};
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
    console.log(this.state.currentExpense);
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

{
  /*
  Note: Write logic which only computes how much you owe your friends or vice versa. 
Step 1: Loop through all contributors and calculate 'amountUserOwes' for each contributor. 
        amountUserOwes = expenseShare - amountPaid
Step 2: Check if you owe money for this expense or you are owed. 
Step 3: Create a new array 'contributorsWithoutYou' and push all contributors except yourself
Step 4: If you owe money(amountUserOwes > 0), sort the array in decreasing order of AmountUserOwes
Step 5: If you are owed money((amountUserOwes < 0)), sort the array in increasing order of AmountUserOwes
Step 6: Create a variable debtRemaining that will calculate the debt remaining while splitting expenses
Step 7: Loop through the contributorsWithoutYou array.
Step 8: In each iteration, check if the your amountUserOwes is > than user's amountUserOwes. 
        If it is, 
*/
}

{
  /* {contributors.length === 2 ? (
                    <div
                      className={classes.splitType}
                      onClick={this.toggleWhoPaidDialog}
                    >
                      Paid by YOU and split EQUALLY
                    </div>
                  ) : (
                    <div>
                      Paid by
                      <span
                        className={classes.splitType}
                        onClick={this.toggleChoosePayerDialog}
                      >
                        YOU
                      </span>
                      and split
                      <span className={classes.splitType}>EQUALLY</span>
                    </div>
                  )} 
                
                 handlePayment = (payee) => {
    switch (payee) {
      case "youPaidSplitEqual":
        this.setState({
          youPaidSplitEqual: true,
          youOweFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: false,
          whoPaidText: "Paid by YOU and split EQUALLY",
        });
        break;
      case "youOweFull":
        this.setState({
          youPaidSplitEqual: false,
          youOweFull: true,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: false,
          whoPaidText: "You owe the full amount",
        });
        break;
      case "theyOweFull":
        this.setState({
          youPaidSplitEqual: false,
          youOweFull: false,
          theyOweFull: true,
          theyPaidSplitEqual: false,
          moreOptions: false,
          whoPaidText: "They owe the full amount",
        });
        break;
      case "theyPaidSplitEqual":
        this.setState({
          youPaidSplitEqual: false,
          youOweFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: true,
          moreOptions: false,
          whoPaidText: "Paid by the other person and split EQUALLY",
        });
        break;
      case "moreOptions":
        this.setState({
          youPaidSplitEqual: false,
          youOweFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: true,
          choosePayerDialog: !this.state.choosePayerDialog,
        });
        break;
    }
    this.setState({ whoPaidDialog: !this.state.whoPaidDialog });
  };
  handleExpenseSharing = (e) => {
    e.preventDefault();
    let {
      youPaidSplitEqual,
      currentExpense,
      youOweFull,
      theyOweFull,
      theyPaidSplitEqual,
      moreOptions,
      currentExpense: { expenseAmount, contributors },
    } = this.state;
    let amountYouOwe, whoPaid, perPersonShare, amount;

    switch (true) {
      case youPaidSplitEqual:
        perPersonShare = expenseAmount / contributors.length;
        amount = perPersonShare * contributors.length - 1;
        amountYouOwe = amount;
        whoPaid = "You";
        break;
      case youOweFull:
        amountYouOwe = -expenseAmount;
        whoPaid = "You";
        break;
      case theyOweFull:
        amountYouOwe = expenseAmount;
        whoPaid = contributors[0];
        break;
      case theyPaidSplitEqual:
        perPersonShare = expenseAmount / contributors.length;
        amountYouOwe = -perPersonShare;
        whoPaid = contributors[0];
        break;
      case moreOptions:
        console.log("moreOptions");
        break;
    }
    console.log(" no moreOptions");
    this.setState({
      currentExpense: { ...currentExpense, amountYouOwe, whoPaid },
    });
    this.props.toggleAddExpenseDialog();
    firebase
      .database()
      .ref("allExpenses")
      .push({ ...currentExpense, amountYouOwe, whoPaid });
    // firebase.database().ref("friendsList").push({})
  };
                
                */
}
