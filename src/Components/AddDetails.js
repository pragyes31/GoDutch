import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";


const addDetailsStyles = {
    addDetails: {
      maxWidth: "600px"
    },
    header: {
      height: "40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#eee"
    },
    left: {
      width: "30%",
      display: "flex",
      justifyContent: "space-between"
    },
    details: {
      width: "600px"
    },
    name: {
      display: "block",
      width: "100%"
    },
    contact: {
      display: "block",
      width: "100%"
    },
    arrow: {
      cursor: "pointer"
    }
  };
  
  class AddDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentFriend: this.props.currentFriend,
        addBtnDisable: true,
        isNumber: false,
        isEmail: false,
        contactInfo:
          this.props.currentFriend.email || this.props.currentFriend.number.number
      };
    }
  
    handleAddBtn = () => {
      const { isEmail, isNumber } = this.state;
      if (isEmail) this.props.handleAddMoreFriends(this.state.currentFriend);
      else if (isNumber) this.props.addCountryCode(this.state.currentFriend);
      else this.props.toggleWrongInput();
    };
  
    handleName = e => {
      let name = e.target.value;
      this.setState(prevState => {
        return { currentFriend: { ...prevState.currentFriend, name } };
      }, this.activeAddBtn);
    };
  
    handleContactInfo = e => {
      let numberRegex = /^[1-9]\d{7,11}$/;
      let emailRegex = /^[\d\w.!#$%&'*+/=?^_`{|}~-]{1,30}@\w{1,30}\.\w{1,30}/;
      let contactInfo = e.target.value;
      if (contactInfo !== "") {
        this.setState(prevState => {
          return {
            contactInfo,
            isEmail: emailRegex.test(contactInfo),
            isNumber: numberRegex.test(contactInfo)
          };
        }, this.updateCurrentFriend);
      } else
        this.setState(
          prevState => ({
            contactInfo,
            currentFriend: {
              ...prevState.currentFriend,
              number: { country: "IN", number: contactInfo },
              email: contactInfo
            }
          }),
          this.activeAddBtn
        );
    };
  
    updateCurrentFriend = () => {
      const { contactInfo } = this.state;
      if (/^[\d]+$/g.test(contactInfo))
        this.setState(prevState => {
          return {
            currentFriend: {
              ...prevState.currentFriend,
              number: { country: "IN", number: contactInfo, dialCode: "91" }
            }
          };
        }, this.activeAddBtn);
      else
        this.setState(prevState => {
          return {
            currentFriend: { ...prevState.currentFriend, email: contactInfo }
          };
        }, this.activeAddBtn);
    };
  
    activeAddBtn = () => {
      const { email, number, name } = this.state.currentFriend;
      if (!!name && (!!email || !!number.number))
        this.setState({ addBtnDisable: false });
      else this.setState({ addBtnDisable: true });
    };
  
    render() {
      const { classes } = this.props;
      const { currentFriend, contactInfo } = this.state;
      return (
        <Dialog
          fullScreen={true}
          open={this.props.addDetailsDialog}
          aria-labelledby="Add New friend Dialog"
          aria-describedby="Add New friend Dialog"
          onBackdropClick={this.props.toggleAddDetails}
          onEscapeKeyDown={this.props.toggleAddDetails}
          classes={{ paper: classes.addDetails }}
        >
          <div className={classes.header}>
            <div className={classes.left}>
              <ArrowBackIcon
                className={classes.arrow}
                onClick={this.props.toggleAddDetails}
              />
              <Typography variant="subtitle1">Add new contact</Typography>
            </div>
            <div className={classes.right}>
              <Button
                disabled={this.state.addBtnDisable}
                onClick={this.handleAddBtn}
              >
                ADD
              </Button>
            </div>
          </div>
          <div className={classes.details}>
            <form className={classes.friendForm}>
              <TextField
                id="name-field"
                label="Name"
                className={classes.name}
                onChange={this.handleName}
                value={this.state.currentFriend.name}
              />
              <TextField
                id="contact-field"
                label="Phone number or email address"
                className={classes.contact}
                onChange={this.handleContactInfo}
                value={contactInfo}
              />
            </form>
          </div>
          <div className="message">
            Don't worry, nothing sends just yet. You will have another chance to
            review before sending.
          </div>
        </Dialog>
      );
    }
  }
  
  export default withStyles(addDetailsStyles)(AddDetails);
  