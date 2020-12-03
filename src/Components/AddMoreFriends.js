import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";



const AddMoreFriendsStyles = {
    box: {
      maxWidth: "600px",
      position: "relative"
    },
    top: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "50px",
      backgroundColor: "#00b8a9"
    },
    arrow: {
      cursor: "pointer",
      width: "7%",
      color: "#fff"
    },
    textField: {
      width: "93%",
      color: "#fff"
    },
    photoIcon: {
      width: "60px",
      position: "relative"
    },
    photo: {
      width: "50px",
      height: "50px",
      color: "#aaa"
    },
    removeUser: {
      width: "25px",
      height: "25px",
      position: "absolute",
      bottom: "5px",
      right: "5px",
      color: "#444",
      cursor: "pointer",
      backgroundColor: "#ddd",
      borderRadius: "50%",
      border: "0px solid #ddd"
    },
    addPara: {
      cursor: "pointer"
    },
    confirmIcon: {
      marginLeft: ".5rem",
      minWidth: "20px",
      height: "22px",
      backgroundColor: "#f2105a",
      color: "#fff",
      cursor: "pointer",
      position: "fixed",
      bottom: "5%",
      right: "5%",
      borderRadius: "50%",
      border: "10px solid #f2105a"
    }
  };
  
  class AddMoreFriends extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentValue: ""
      };
    }
  
    handleChange = e => {
      this.setState({ currentValue: e.target.value });
    };
    render() {
      const { classes, friendsToAdd } = this.props;
      return (
        <Dialog
          fullScreen={true}
          open={this.props.addMoreFriendsDialog}
          aria-labelledby="Add more friends"
          aria-describedby="Add more friends"
          onBackdropClick={this.props.toggleAddMoreFriends}
          onEscapeKeyDown={this.props.toggleAddMoreFriends}
          classes={{ paper: classes.box }}
        >
          <div className={classes.top}>
            <ArrowBackIcon
              className={classes.arrow}
              onClick={this.props.handleBackButton}
            />
            <TextField
              id="add-friend-field"
              className={classes.textField}
              placeholder="Enter name, email, phone #"
              onChange={this.handleChange}
              value={this.state.currentValue}
            />
          </div>
          <div className={classes.friendsToAdd}>
            {friendsToAdd.map(friend => {
              return (
                <div className={classes.friend} key={friend.key}>
                  <div className={classes.photoIcon}>
                    <AccountCircleIcon className={classes.photo} />
                    <HighlightOffIcon
                      className={classes.removeUser}
                      onClick={() => this.props.handleRemoveUser(friend.key)}
                    />
                  </div>
                  <Typography>{friend.name}</Typography>
                </div>
              );
            })}
            <Typography
              variant="subtitle1"
              className={classes.addPara}
              onClick={() =>
                this.props.handleCurrentFriend(
                  this.state.currentValue,
                  Date.now(),
                  "AddMoreFriends"
                )
              }
            >
              {this.state.currentValue
                ? `Add ${this.state.currentValue} to Go-Dutch`
                : "Add a new contact to Go-Dutch"}
            </Typography>
          </div>
          <ArrowForwardIcon
            className={classes.confirmIcon}
            onClick={this.props.toggleConfirmFriends}
          />
        </Dialog>
      );
    }
  }
  
  export default withStyles(AddMoreFriendsStyles)(AddMoreFriends);
  