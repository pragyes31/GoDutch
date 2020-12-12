
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import MuiPhoneNumber from "material-ui-phone-number";

  const editFriendDetailsStyles = {
    editFriend: {
      maxWidth: "600px"
    },
    header: {
      height: "40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#00b8a9"
    },
    left: {
      width: "25%",
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

class EditFriendDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        contactInfo: "currentInfo",
        setNumber: false,
        setEmail: false,
        friendToEdit: props.editFriendDetails,
        numberToDisplay: `${props.editFriendDetails.number.dialCode} ${
          props.editFriendDetails.number.number
        }`
      };
    }
  
    handleRadio = e => {
      this.setState({
        contactInfo: e.target.value
      });
      e.target.value === "newNumber"
        ? this.setState({ setNumber: true })
        : this.setState({ setNumber: false });
      e.target.value === "newEmail"
        ? this.setState({ setEmail: true })
        : this.setState({ setEmail: false });
    };
  
    handleName = e => {
      this.setState({
        friendToEdit: { ...this.state.friendToEdit, name: e.target.value }
      });
    };
  
    handleEmail = e => {
      this.setState({
        friendToEdit: { ...this.state.friendToEdit, email: e.target.value }
      });
    };
  
    handlePhoneNumber = (num, countryObj) => {
      const { friendToEdit } = this.state;
      let number = num.toString().replace(`+${countryObj.dialCode} `, "")
      this.setState({
        friendToEdit: {
          ...friendToEdit,
          number: {
            number,
            country: countryObj.countryCode,
            dialCode: countryObj.dialCode
          }
        }
      });
    };
  
    handleFinsihEditing = () => {
      let numberRegex = /^[1-9]\d{7,11}$/;
      let emailRegex = /^[\d\w.!#$%&'*+/=?^_`{|}~-]{1,30}@\w{1,30}\.\w{1,30}/;
      const { friendToEdit } = this.state;
      const { email, number } = this.state.friendToEdit;
      if (
        (!!email && emailRegex.test(email)) ||
        (!!number.number && numberRegex.test(number.number))
      ) {
        console.log(friendToEdit)
        this.props.handleEditedFriend(friendToEdit);
      } else {
        this.props.toggleWrongInput();
      }
    };
  
    render() {
      const { classes } = this.props;
      const { friendToEdit } = this.state;
      return (
        <div>
          <Dialog
            fullScreen={true}
            open={this.props.editFriendDetailsDialog}
            aria-labelledby="Edit friend details"
            aria-describedby="Edit friend details"
            onBackdropClick={this.props.toggleEditFriendDetailsDialog}
            onEscapeKeyDown={this.props.toggleEditFriendDetailsDialog}
            classes={{ paper: classes.editFriend }}
          >
            <div className={classes.header}>
              <div className={classes.left}>
                <ArrowBackIcon
                  className={classes.arrowBack}
                  onClick={this.props.toggleEditFriendDetailsDialog}
                />
                <Typography variant="subtitle1">Edit Contact</Typography>
              </div>
              <div className={classes.right}>
                <Button onClick={() => this.handleFinsihEditing(friendToEdit)}>
                  DONE
                </Button>
              </div>
            </div>
            <div>
              <form className={classes.editForm}>
                <TextField
                  id="name-field"
                  label="Name"
                  className={classes.name}
                  onChange={this.handleName}
                  value={friendToEdit.name}
                />
                <div>
                  <RadioGroup
                    aria-label="contact info"
                    name="contact info"
                    value={this.state.contactInfo}
                    onChange={this.handleRadio}
                  >
                    <FormControlLabel
                      value="currentInfo"
                      control={<Radio />}
                      label={friendToEdit.email}
                    />
                    <FormControlLabel
                      value="newNumber"
                      control={<Radio />}
                      label={
                        !this.state.setNumber ? (
                          "Enter a new phone number"
                        ) : (
                          <MuiPhoneNumber
                            value={this.state.numberToDisplay}
                            onChange={this.handlePhoneNumber}
                          />
                        )
                      }
                    />
                    <FormControlLabel
                      value="newEmail"
                      control={<Radio />}
                      label={
                        !this.state.setEmail ? (
                          "Enter a new email address"
                        ) : (
                          <TextField
                            id="new-email"
                            className={classes.newEmail}
                            onChange={this.handleEmail}
                            value={friendToEdit.email}
                          />
                        )
                      }
                    />
                  </RadioGroup>
                </div>
              </form>
            </div>
          </Dialog>
        </div>
      );
    }
  }
  
  
  export default withStyles(editFriendDetailsStyles)(EditFriendDetails);
  