import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";


const confirmRemoveFriendStyles = {
    codeBox: {
      width: "350px",
      height: "150px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      paddingLeft: "1rem"
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginRight: "1rem"
    }
  };
  
  function ConfirmRemoveFriendComp(props) {
    const { classes } = props;
    return (
      <Dialog
        open={props.confirmRemoveFriend}
        aria-labelledby="Confirmation for removing user"
        aria-describedby="Confirmation for removing user"
        onBackdropClick={props.toggleRemoveFriend}
        onEscapeKeyDown={props.toggleRemoveFriend}
        classes={{ paper: classes.codeBox }}
      >
        <Typography variant="h6" className={classes.name}>
          Remove this person?
        </Typography>
        <Typography className={classes.name}>
          If you remove this person, they will not be added to your group.
        </Typography>
        <div className={classes.buttons}>
          <Button color="primary" onClick={props.toggleRemoveFriend}>
            CANCEL
          </Button>
          <Button
            color="primary"
            onClick={() => props.handleRemoveUser(props.friendKey)}
          >
            REMOVE
          </Button>
        </div>
      </Dialog>
    );
  }
  
  const ConfirmRemoveFriend = withStyles(confirmRemoveFriendStyles)(
    ConfirmRemoveFriendComp
  );
  

const confirmFriendsStyles = {
    confirmDetails: {
      maxWidth: "600px",
      position: "relative"
    },
    header: {
      height: "40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#00b8a9"
    },
    left: {
      width: "30%",
      display: "flex",
      justifyContent: "space-between"
    },
    friend: {
      display: "flex",
      justifyContent: "space-between",
      margin: "1rem"
    },
    userDetails: {
      width: "60px",
      position: "relative",
      display: "flex"
    },
    profilePhoto: {
      marginRight: "2rem"
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
    arrowBack: {
      cursor: "pointer"
    },
    edit: {
      cursor: "pointer"
    }
  };


class ConfirmFriends extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        confirmRemoveFriend: false
      };
    }
    toggleRemoveFriend = () => {
      this.setState({ confirmRemoveFriend: !this.state.confirmRemoveFriend });
    };
    render() {
      const { classes } = this.props;
  
      return (
        <div className={classes.addFriend}>
          <Dialog
            fullScreen={true}
            open={this.props.confirmFriendsDialog}
            aria-labelledby="Add New friend Dialog"
            aria-describedby="Add New friend Dialog"
            onBackdropClick={this.props.toggleConfirmFriendsDialog}
            onEscapeKeyDown={this.props.toggleConfirmFriendsDialog}
            classes={{ paper: classes.confirmDetails }}
          >
            <div className={classes.header}>
              <div className={classes.left}>
                <ArrowBackIcon
                  className={classes.arrowBack}
                  onClick={this.props.toggleConfirmFriendsDialog}
                />
                <Typography variant="subtitle1">Verify contact info</Typography>
              </div>
              <div className={classes.right}>
                <Button onClick={this.props.handleAddFriends}>FINISH</Button>
              </div>
            </div>
            <div className={classes.friendsToAdd}>
              {this.props.friendsToAdd.map(friend => {
                return (
                  <div className={classes.friend} key={friend.key}>
                    <div className={classes.userDetails}>
                      <div className={classes.profilePhoto}>
                        <AccountCircleIcon className={classes.photo} />
                        <HighlightOffIcon
                          className={classes.removeUser}
                          onClick={this.toggleRemoveFriend}
                        />
                      </div>
                      <div>
                        <Typography className={classes.name}>
                          {friend.name}
                        </Typography>
                        <Typography className={classes.contactInfo}>
                          {friend.number.number || friend.email}
                        </Typography>
                      </div>
                    </div>
                    <EditIcon
                      className={classes.edit}
                      onClick={() => this.props.editFriendDetails(friend.key)}
                    />
                    {this.state.confirmRemoveFriend && (
                      <ConfirmRemoveFriend
                        confirmRemoveFriend={this.state.confirmRemoveFriend}
                        toggleRemoveFriend={this.toggleRemoveFriend}
                        friendKey={friend.key}
                        handleRemoveUser={this.props.handleRemoveUser}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Dialog>
        </div>
      );
    }
  }
  
  export default withStyles(confirmFriendsStyles)(ConfirmFriends);
  