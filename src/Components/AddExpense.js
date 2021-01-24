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
  },
  splitType: {
    width: "300px",
    textAlign: "center",
    padding: "0.5rem",
    marginTop: "1rem",
    cursor: "pointer",
    boxShadow: "1px 1px 2px 1px #C9C9C9",
  },
};

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsList: [],
      friendsListDialogOpen: true,
      friendName: "",
      friendForExpenses: [],
      whoPaidDialog: false,
      selectedFriends: [],
      youPaidSplitEqual: true,
      youOwnFull: false,
      theyOweFull: false,
      theyPaidSplitEqual: false,
      moreOptions: false,
      currentExpense: {
        description: "",
        expenseAmount: "",
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
  handleFriendName = (e) => {
    this.setState({ friendName: e.target.value });
  };
  handleAddFriendForExpense = () => {};
  toggleWhoPaidDialog = () => {
    this.setState({ whoPaidDialog: !this.state.whoPaidDialog });
  };
  handleContributors = (e, contributors) => {
    this.setState({
      currentExpense: {
        ...this.state.currentExpense,
        contributors,
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
        expenseAmount: e.target.value,
      },
    });
  };
  handlePayee = (payee) => {
    switch (payee) {
      case "youPaidSplitEqual":
        this.setState({
          youPaidSplitEqual: true,
          youOwnFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: false,
        });
        break;
      case "youOwnFull":
        this.setState({
          youPaidSplitEqual: false,
          youOwnFull: true,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: false,
        });
        break;
      case "theyOweFull":
        this.setState({
          youPaidSplitEqual: false,
          youOwnFull: false,
          theyOweFull: true,
          theyPaidSplitEqual: false,
          moreOptions: false,
        });
        break;
      case "theyPaidSplitEqual":
        this.setState({
          youPaidSplitEqual: false,
          youOwnFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: true,
          moreOptions: false,
        });
        break;
      case "moreOptions":
        this.setState({
          youPaidSplitEqual: false,
          youOwnFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: true,
        });
        break;
    }
    this.setState({ whoPaidDialog: !this.state.whoPaidDialog });
  };
  handleExpenseSharing = () => {
    const {
      youPaidSplitEqual,
      currentExpense,
      currentExpense: { expenseAmount, contributors, amountYouOwe },
    } = this.state;
    let perPersonShare = expenseAmount / (contributors.length + 1);
    amountYouOwe = perPersonShare * contributors.length;
    if (youPaidSplitEqual) {
      this.setState({ currentExpense: { ...currentExpense, amountYouOwe } });
      this.props.toggleAddExpenseDialog();
    }
  };
  render() {
    const { classes } = this.props;
    const { friendsList, whoPaidDialog, currentExpense } = this.state;

    return (
      <div className={classes.addFriend}>
        <Dialog
          fullScreen={true}
          open={this.props.addExpenseDialog}
          aria-labelledby="Add new expense"
          aria-describedby="Add new expense"
          onBackdropClick={this.props.toggleAddExpenseDialog}
          onEscapeKeyDown={this.props.toggleAddExpenseDialog}
          classes={{ paper: classes.AddExpense }}
        >
          <div className={classes.header}>
            <div className={classes.left}>
              <ArrowBackIcon className={classes.arrowBack} />
              <Typography variant="subtitle1">Add expense</Typography>
            </div>
            <div className={classes.right}>
              <Button onClick={this.handleExpenseSharing}>SAVE</Button>
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
              />
            </div>
            <div className={classes.split}>
              <div
                className={classes.splitType}
                onClick={this.toggleWhoPaidDialog}
              >
                Paid by YOU and split EQUALLY
              </div>
              <WhoPaidDialog
                whoPaidDialog={whoPaidDialog}
                handlePayee={this.handlePayee}
                toggleWhoPaidDialog={this.toggleWhoPaidDialog}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(AddExpenseStyles)(AddExpense);
