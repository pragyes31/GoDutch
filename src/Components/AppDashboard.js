import React from "react";

import AddCountryCode from "./AddCountryCode";
import AddFriend from "./AddFriend";
import AddDetails from "./AddDetails";
import AddExpense from "./AddExpense";
import AddMoreFriends from "./AddMoreFriends";
import ConfirmFriends from "./ConfirmFriends";
import EditFriendDetails from "./EditFriendDetails";
import Header from "./Header";
import NavBar from "./NavBar";
import OptionsDialog from "./OptionsDialog";
import ThreeDotsPopover from "./ThreeDotsPopover";
import WrongInput from "./WrongInput";

import firebase from "../firebase/firebase";

import Tooltip from "@material-ui/core/Tooltip";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import { withStyles } from "@material-ui/core/styles";

const addExpenseButtonStyles = {
  button: {
    marginLeft: ".5rem",
    minWidth: "50px",
    height: "50px",
    color: "#f2105a",
    fontSize: "30px !important",
    cursor: "pointer",
    position: "fixed",
    bottom: "5%",
    right: "5%",
  },
};

function AddExpenseButtonComp(props) {
  const { classes, toggleAddExpenseDialog } = props;
  return (
    <div>
      <Tooltip title={props.tooltip}>
        <AddCircleIcon
          onClick={toggleAddExpenseDialog}
          className={classes.button}
        />
      </Tooltip>
    </div>
  );
}

const AddExpenseButton = withStyles(addExpenseButtonStyles)(
  AddExpenseButtonComp
);

export default class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsDialog: false,
      threeDotsDialog: false,
      addFriendDialog: false,
      addDetailsDialog: false,
      wrongInputDialog: false,
      addMoreFriendsDialog: false,
      confirmFriendsDialog: false,
      addCountryCode: false,
      editFriendDetailsDialog: false,
      addExpenseDialog: false,

      anchorEl: false,

      addFriend: false,

      currentFriend: {
        name: "",
        number: { country: "IN", number: "", dialCode: "91" },
        email: "",
        key: "",
        balance:""
      },
      friendsToAdd: [],
      editFriendDetails: {
        name: "",
        number: { country: "IN", number: "", dialCode: "91" },
        email: "",
        key: "",
        balance:""
      },
      friendsList: [],

      openFriends: true,
      openGroups: false,
      openActivity: false,
    };
  }

  handle3DotsClose = () => {
    this.setState({
      anchorEl: false,
      threeDotsDialog: !this.state.threeDotsDialog,
    });
  };

  toggleOptionsDialog = () =>
    this.setState({ optionsDialog: !this.state.optionsDialog });

  toggle3DotsDialog = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      threeDotsDialog: !this.state.threeDotsDialog,
    });
  };

  toggleThreeDots = () => {
    this.setState({
      addFriendDialog: !this.state.addFriendDialog,
      threeDotsDialog: !this.state.threeDotsDialog,
    });
  };

  toggleAddFriend = () => {
    this.setState({ addFriendDialog: !this.state.addFriendDialog });
  };

  toggleAddDetails = () => {
    this.setState({ addDetailsDialog: !this.state.addDetailsDialog });
  };

  handleBackButton = () => {
    this.setState({
      threeDotsDialog: false,
      addFriendDialog: false,
      addDetailsDialog: false,
      addMoreFriendsDialog: false,
      currentFriend: {
        name: "",
        number: { country: "IN", number: "" },
        email: "",
        key: "",
      },
      friendsToAdd: [],
    });
  };

  handleCurrentFriend = (currentFriendInput, dateForKey, currentWindow) => {
    let isNumber = /^[1-9]\d+$/.test(currentFriendInput);
    let isEmail = currentFriendInput.includes("@");
    switch (currentWindow) {
      case "AddFriend":
        setTimeout(
          () => this.setState({ addFriendDialog: !this.state.addFriendDialog }),
          200
        );

        break;
      case "AddMoreFriends":
        this.setState({
          addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
        });
        break;
    }
    if (isNumber) {
      this.setState({
        currentFriend: {
          ...this.state.currentFriend,
          number: {
            country: "IN",
            number: currentFriendInput,
            dialCode: "+91",
          },
          key: dateForKey,
        },
        addDetailsDialog: !this.state.addDetailsDialog,
      });
    } else if (isEmail) {
      this.setState({
        currentFriend: {
          ...this.state.currentFriend,
          email: currentFriendInput,
          key: dateForKey,
        },
        addDetailsDialog: !this.state.addDetailsDialog,
      });
    } else {
      this.setState({
        currentFriend: {
          ...this.state.currentFriend,
          key: dateForKey,
          name: currentFriendInput,
        },
        addDetailsDialog: !this.state.addDetailsDialog,
      });
    }
  };

  toggleWrongInput = () =>
    this.setState({ wrongInputDialog: !this.state.wrongInputDialog });

  toggleAddMoreFriends = (currentFriend) =>
    this.setState({
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
      friendsToAdd: [],
    });

  toggleAddExpenseDialog = () => {
    this.setState({ addExpenseDialog: !this.state.addExpenseDialog });
  };

  handleAddMoreFriends = (currentFriend) =>
    this.setState({
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
      addDetailsDialog: !this.state.addDetailsDialog,
      friendsToAdd: [...this.state.friendsToAdd, currentFriend],
    });

  openAddMoreDetails = (currentFriend) => {
    this.setState({
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
      addDetailsDialog: !this.state.addDetailsDialog,
      addCountryCode: !this.state.addCountryCode,
      friendsToAdd: [...this.state.friendsToAdd, currentFriend],
    });
  };

  toggleFriendsToAdd = () => {
    this.setState({
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
      friendsToAdd: [],
    });
  };

  handleRemoveUser = (friendKey) => {
    let friendsToAdd = this.state.friendsToAdd.filter(
      (friend) => friend.key !== friendKey
    );
    this.setState({ friendsToAdd });
  };

  toggleConfirmFriends = () => {
    this.setState({
      confirmFriendsDialog: !this.state.confirmFriendsDialog,
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
    });
  };

  addCountryCode = (currentFriend) => {
    this.setState({
      addCountryCode: !this.state.addCountryCode,
      currentFriend,
    });
  };

  confirmRemoveFriend = (key) => {
    this.setState({ confirmRemoveFriend: !this.state.confirmRemoveFriend });
  };

  editFriendDetails = (key) => {
    let friendToEdit = this.state.friendsToAdd.filter(
      (friend) => friend.key === key
    );

    this.setState({
      editFriendDetails: { ...friendToEdit[0] },
      editFriendDetailsDialog: !this.state.editFriendDetailsDialog,
    });
  };

  toggleEditFriendDetailsDialog = () => {
    this.setState({
      editFriendDetailsDialog: !this.state.editFriendDetailsDialog,
    });
  };

  toggleConfirmFriendsDialog = () => {
    this.setState({
      confirmFriendsDialog: !this.state.confirmFriendsDialog,
      friendsToAdd: [],
    });
  };

  handleAddFriends = () => {
    let friendsToAdd = [...this.state.friendsList, ...this.state.friendsToAdd];
    this.setState((prevState) => {
      return this.setState({
        confirmFriendsDialog: !this.state.confirmFriendsDialog,
        friendsList: friendsToAdd,
        friendsToAdd: [],
      });
    });
    this.addFriendsToDb(this.state.friendsToAdd);
  };

  addFriendsToDb = (friendsList) => {
    friendsList.forEach((friend) => {
      firebase
        .database()
        .ref("friendsList")
        .push({
          ...friend,
        });
    });
  };

  handleEditedFriend = (editedFriend) => {
    let filteredFriends = this.state.friendsToAdd.filter(
      (friend) => friend.key !== editedFriend.key
    );
    this.setState({
      friendsToAdd: [...filteredFriends, editedFriend],
      editFriendDetailsDialog: !this.state.editFriendDetailsDialog,
    });
  };

  switchTab = (tabName) => {
    switch (tabName) {
      case "friendsTab":
        this.setState({
          openFriends: true,
          openGroups: false,
          openActivity: false,
        });
        break;
      case "groupsTab":
        this.setState({
          openFriends: false,
          openGroups: true,
          openActivity: false,
        });
        break;
      case "activityTab":
        this.setState({
          openFriends: false,
          openGroups: false,
          openActivity: true,
        });
        break;
    }
  };

  populateBalance = (balanceSheet) => {
    firebase
    .database()
    .ref("blanceSheet")
    .push()
  }

/*

  balanceSheetDb = {
  "-MT0eTuHDa_dzmMtmMUv": -10,
}
  balanceSheetNew = {
  "-MT0eTuHDa_dzmMtmMUv": 150,
  "-MT0eTuTUVa6dc4-hv14": 150
}
*/   

  render() {
    return (
      <div className="app-dashboard">
        <Header
          threeDotsDialog={this.state.threeDotsDialog}
          toggle3DotsDialog={this.toggle3DotsDialog}
          toggleOptionsDialog={this.toggleOptionsDialog}
        />
        <NavBar
          switchTab={this.switchTab}
          openFriends={this.state.openFriends}
          openGroups={this.state.openGroups}
          openActivity={this.state.openActivity}
          friendsList={this.state.friendsList}
        />
        <AddExpenseButton
          addExpense={this.addExpense}
          color="secondary"
          tooltip="Add Expense"
          toggleAddExpenseDialog={this.toggleAddExpenseDialog}
          populateBalance={this.populateBalance}
        />
        {this.state.optionsDialog && (
          <OptionsDialog
            optionsDialog={this.state.optionsDialog}
            toggleOptionsDialog={this.toggleOptionsDialog}
          />
        )}
        {this.state.threeDotsDialog && (
          <ThreeDotsPopover
            anchorEl={this.state.anchorEl}
            handle3DotsClose={this.handle3DotsClose}
            friendsToAdd={this.state.friendsToAdd}
            toggleThreeDots={this.toggleThreeDots}
            threeDotsDialog={this.state.threeDotsDialog}
          />
        )}
        {this.state.addFriendDialog && (
          <AddFriend
            addFriend={this.state.addFriendDialog}
            handleCurrentFriend={this.handleCurrentFriend}
            toggleAddFriend={this.toggleAddFriend}
            handleBackButton={this.handleBackButton}
          />
        )}
        {this.state.addDetailsDialog && (
          <AddDetails
            addDetailsDialog={this.state.addDetailsDialog}
            currentFriend={this.state.currentFriend}
            handleCurrentFriend={this.handleCurrentFriend}
            toggleWrongInput={this.toggleWrongInput}
            toggleAddMoreFriends={this.toggleAddMoreFriends}
            toggleAddDetails={this.toggleAddDetails}
            handleBackButton={this.handleBackButton}
            addCountryCode={this.addCountryCode}
            handleAddMoreFriends={this.handleAddMoreFriends}
          />
        )}
        {this.state.addCountryCode && (
          <AddCountryCode
            addCountryCode={this.addCountryCode}
            currentFriend={this.state.currentFriend}
            handlePhoneNumber={this.handlePhoneNumber}
            openAddMoreDetails={this.openAddMoreDetails}
          />
        )}
        {this.state.wrongInputDialog && (
          <WrongInput
            wrongInputDialog={this.state.wrongInputDialog}
            toggleWrongInput={this.toggleWrongInput}
          />
        )}
        {this.state.addMoreFriendsDialog && (
          <AddMoreFriends
            addMoreFriendsDialog={this.state.addMoreFriendsDialog}
            friendsToAdd={this.state.friendsToAdd}
            toggleAddMoreFriends={this.toggleAddMoreFriends}
            handleCurrentFriend={this.handleCurrentFriend}
            toggleFriendsToAdd={this.toggleFriendsToAdd}
            handleBackButton={this.handleBackButton}
            handleRemoveUser={this.handleRemoveUser}
            confirmFriendsDialog={this.state.confirmFriendsDialog}
            toggleConfirmFriends={this.toggleConfirmFriends}
          />
        )}
        {this.state.confirmFriendsDialog && (
          <ConfirmFriends
            confirmFriendsDialog={this.state.confirmFriendsDialog}
            friendsToAdd={this.state.friendsToAdd}
            handleRemoveUser={this.handleRemoveUser}
            editFriendDetails={this.editFriendDetails}
            toggleConfirmFriendsDialog={this.toggleConfirmFriendsDialog}
            handleAddFriends={this.handleAddFriends}
          />
        )}
        {this.state.editFriendDetailsDialog && (
          <EditFriendDetails
            toggleEditFriendDetailsDialog={this.toggleEditFriendDetailsDialog}
            editFriendDetailsDialog={this.state.editFriendDetailsDialog}
            editFriendDetails={this.state.editFriendDetails}
            toggleWrongInput={this.toggleWrongInput}
            handleEditedFriend={this.handleEditedFriend}
          />
        )}
        <AddExpense
          addExpenseDialog={this.state.addExpenseDialog}
          toggleAddExpenseDialog={this.toggleAddExpenseDialog}
        />
      </div>
    );
  }
}
  