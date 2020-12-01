import React from "react";

import Header from './Header'
import OptionsDialog from './OptionsDialog'
import ThreeDotsPopover from './ThreeDotsPopover'

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CropFreeIcon from "@material-ui/icons/CropFree";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FilterListIcon from "@material-ui/icons/FilterList";
import HomeIcon from "@material-ui/icons/Home";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MailIcon from "@material-ui/icons/Mail";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SettingsIcon from "@material-ui/icons/Settings";

import { withStyles } from "@material-ui/core/styles";

import MuiPhoneNumber from "material-ui-phone-number";

class AddFriendComp extends React.Component {
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
    const { classes } = this.props;
    return (
      <div className={classes.addFriend}>
        <Dialog
          fullScreen={true}
          open={this.props.addFriend}
          aria-labelledby="Add New friend Dialog"
          aria-describedby="Add New friend Dialog"
          onBackdropClick={this.props.toggleAddFriend}
          onEscapeKeyDown={this.props.toggleAddFriend}
          classes={{ paper: classes.addFriend }}
        >
          <div className={classes.top}>
            <ArrowBackIcon
              className={classes.arrow}
              onClick={this.props.toggleAddFriend}
            />
            <TextField
              id="add-friend-field"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.currentValue}
              placeholder="Enter name, email, phone #"
            />
          </div>
          <div className={classes.addForm}>
            <PersonAddIcon className={classes.addIcon} />
            <Typography
              variant="subtitle1"
              className="addPara"
              onClick={() =>
                this.props.handleCurrentFriend(
                  this.state.currentValue,
                  Date.now(),
                  "AddFriend"
                )
              }
            >
              {this.state.currentValue
                ? `Add ${this.state.currentValue} to Go-Dutch`
                : "Add a new contact to Go-Dutch"}
            </Typography>
          </div>
        </Dialog>
      </div>
    );
  }
}

const addFriendStyles = {
  addFriend: {
    maxWidth: "600px"
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
  addForm: {
    marginTop: "10px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
    cursor: "pointer"
  },
  addIcon: {
    color: "#fff",
    border: "6px solid #38a385",
    borderRadius: "50%",
    height: "17px",
    width: "17px",
    backgroundColor: "#38a385",
    marginRight: "10px"
  }
};

const AddFriend = withStyles(addFriendStyles)(AddFriendComp);

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

class AddDetailsComp extends React.Component {
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

const AddDetails = withStyles(addDetailsStyles)(AddDetailsComp);

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

class AddMoreFriendsComp extends React.Component {
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

const AddMoreFriends = withStyles(AddMoreFriendsStyles)(AddMoreFriendsComp);

class ConfirmFriendsComp extends React.Component {
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

const ConfirmFriends = withStyles(confirmFriendsStyles)(ConfirmFriendsComp);

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
  const { classes, currentFriend } = props;
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

const wrongInputStyles = {
  alertDialogBox: {
    width: "300px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  message: {
    padding: "10px",
    textAlign: "center",
    marginTop: "1rem"
  },
  close: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "1rem"
  }
};

function WrongInputComp(props) {
  const { classes } = props;
  return (
    <Dialog
      open={props.wrongInputDialog}
      aria-labelledby="Wrong phone number or email id"
      aria-describedby="Wrong phone number or email id"
      onBackdropClick={props.toggleWrongInput}
      onEscapeKeyDown={props.toggleWrongInput}
      classes={{ paper: classes.alertDialogBox }}
    >
      <Typography className={classes.message}>
        Invalid phone number or email id.
      </Typography>
      <div className={classes.close}>
        <Button color="primary" onClick={props.toggleWrongInput}>
          OK
        </Button>
      </div>
    </Dialog>
  );
}

const WrongInput = withStyles(wrongInputStyles)(WrongInputComp);

const addCountryCodeStyles = {
  codeBox: {
    width: "300px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: "1rem"
  }
};

class AddCountryCodeComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFriend: props.currentFriend,
      tempNumber: `${props.currentFriend.number.dialCode} ${
        props.currentFriend.number.number
      }`
    };
  }
  handlePhoneNumber = (number, countryObj) => {
    const { currentFriend } = this.state;
    this.setState({
      tempNumber: number,
      currentFriend: {
        ...currentFriend,
        number: {
          number: number,
          country: countryObj.countryCode,
          dialCode: countryObj.dialCode
        }
      }
    });
  };
  render() {
    const { classes, openAddMoreDetails, addCountryCode } = this.props;
    const { currentFriend } = this.state;
    return (
      <Dialog
        open={this.props.addCountryCode}
        aria-labelledby="Select country for country code"
        aria-describedby="Select country for country code"
        onBackdropClick={this.props.addCountryCode}
        onEscapeKeyDown={this.props.addCountryCode}
        classes={{ paper: classes.codeBox }}
      >
        <MuiPhoneNumber
          defaultCountry={"in"}
          value={this.state.tempNumber}
          onChange={this.handlePhoneNumber}
        />
        <div className={classes.buttons}>
          <Button
            color="primary"
            onClick={() => openAddMoreDetails(currentFriend)}
          >
            OK
          </Button>
          <Button color="primary" onClick={addCountryCode}>
            Cancel
          </Button>
        </div>
      </Dialog>
    );
  }
}

const AddCountryCode = withStyles(addCountryCodeStyles)(AddCountryCodeComp);

class EditFriendDetailsComp extends React.Component {
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

  handleNumber = (e, countryObj) => {
    const { friendToEdit } = this.state;
    this.setState({
      friendToEdit: {
        ...friendToEdit,
        number: {
          number: e.target.value,
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
      (!!email && this.emailRegex.test(email)) ||
      (!!number.number && this.numberRegex.test(number.number))
    ) {
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

const EditFriendDetails = withStyles(editFriendDetailsStyles)(
  EditFriendDetailsComp
);

const navBarStyles = {
  nav: {
    backgroundColor: "#00b8a9"
  }
};

function NavBarComp(props) {
  const [value, setValue] = React.useState(0);
  const { classes } = props;
  const handleTabs = (event, val) => {
    setValue(val);
  };
  return (
    <div>
      <AppBar className={classes.nav} position="static">
        <Tabs
          value={value}
          onChange={handleTabs}
          aria-label="simple tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <FriendsTab tabName="friends" friendsList={props.friendsList} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GroupsTab tabName="groups" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GroupsTab />
        </TabPanel>
      </AppBar>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
}

const NavBar = withStyles(navBarStyles)(NavBarComp);

const userBalanceStyles = {
  userInfo: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  avatar: {
    minWidth: "55px !important",
    height: "50px !important",
    borderRadius: "50%",
    backgroundImage: `url("https://bit.ly/2UhwGb4")`,
    border: "3px solid #00b8a9",
    marginRight: "10px"
  }
};

function UserBalanceComp(props) {
  const { classes } = props;
  return (
    <div className={classes.userInfo}>
      <div className="user__info__avatar">
        <div className={classes.avatar} />
      </div>
      <div className="user__info__balance">
        <Typography>TOTAL BALANCE</Typography>
        <Typography>You are all settled up.</Typography>
      </div>
    </div>
  );
}

const UserBalance = withStyles(userBalanceStyles)(UserBalanceComp);

const filterDialogStyles = {
  Dialog: {
    width: "280px",
    height: "150px",
    position: "relative",
    bottom: "130px",
    left: "50px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "left",
    flexDirection: "column"
  },
  dialogChild: {
    height: "100%",
    paddingLeft: "10px",
    backgroundColor: "lightgrey",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "left",
    flexDirection: "column",
    "&:hover": {
      backgroundColor: "grey",
      color: "white"
    }
  }
};

function FilterDialogComp(props) {
  const { classes } = props;
  return (
    <Dialog
      open={props.filterDialog}
      aria-labelledby="Add New friend Dialog"
      aria-describedby="Add New friend Dialog"
      onBackdropClick={() => props.toggleDialog("filterDialog")}
      onEscapeKeyDown={() => props.toggleDialog("filterDialog")}
      classes={{ paper: classes.Dialog }}
    >
      <Typography className={classes.dialogChild}>
        All {props.tabName}
      </Typography>
      <Typography className={classes.dialogChild}>
        {props.tabName} with outstanding balances
      </Typography>
      <Typography className={classes.dialogChild}>
        {props.tabName} you owe
      </Typography>
      <div className={classes.dialogChild}>
        {props.tabName === "friends" ? "friends who" : "groups that"} owe you
      </div>
    </Dialog>
  );
}

const FilterDialog = withStyles(filterDialogStyles)(FilterDialogComp);

const friendsTabStyles = {
  user: {
    width: "100%",
    height: "80px",
    backgroundColor: "#eada82",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    color: "#000"
  },
  filter: {
    position: "relative"
  },
  filterBtn: {
    minWidth: "35px !important",
    height: "30px !important",
    border: "2px solid black",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  friendsDashboard: {
    backgroundColor: "#fff",
    color: "#000"
  }
};

class FriendsTabComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDialog: false
    };
  }
  toggleDialog = () =>
    this.setState({ filterDialog: !this.state.filterDialog });
  render() {
    const { classes, friendsList } = this.props;
    return (
      <div className={classes.friendsTab}>
        <div className={classes.user}>
          <UserBalance />
          <div className={classes.filter}>
            <FilterListIcon
              className={classes.filterBtn}
              onClick={this.toggleDialog}
            />
            {this.state.filterDialog && (
              <FilterDialog
                tabName={this.props.tabName}
                filterDialog={this.state.filterDialog}
                toggleDialog={this.toggleDialog}
              />
            )}
          </div>
        </div>
        <div className={classes.friendsDashboard}>
          {friendsList.map(friend => {
            return friend.name;
          })}
        </div>
      </div>
    );
  }
}

const FriendsTab = withStyles(friendsTabStyles)(FriendsTabComp);

const groupsTabStyles = {
  user: {
    width: "100%",
    height: "80px",
    backgroundColor: "#eada82",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  filter: {
    position: "relative"
  },
  filterBtn: {
    minWidth: "35px !important",
    height: "30px !important",
    border: "2px solid black",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

class GroupsTabComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDialog: false
    };
  }
  toggleDialog = () =>
    this.setState({ filterDialog: !this.state.filterDialog });

  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.tabName}>
        <div className={classes.user}>
          <UserBalance />
          <div className={classes.filter}>
            <FilterListIcon
              className={classes.filterBtn}
              onClick={this.toggleDialog}
            />
            {this.state.filterDialog && (
              <FilterDialog
                tabName={this.props.tabName}
                filterDialog={this.state.filterDialog}
                toggleDialog={this.toggleDialog}
              />
            )}
          </div>
        </div>
        <div />
      </div>
    );
  }
}

const GroupsTab = withStyles(groupsTabStyles)(GroupsTabComp);

function ActivityTab() {
  return <div>You are inside Activity tab.</div>;
}

const addButtonStyles = {
  button: {
    marginLeft: ".5rem",
    minWidth: "50px",
    height: "50px",
    color: "#f2105a",
    fontSize: "30px !important",
    cursor: "pointer",
    position: "fixed",
    bottom: "5%",
    right: "5%"
  }
};

function AddButtonComp(props) {
  const { classes } = props;
  return (
    <div>
      <Tooltip title={props.tooltip}>
        <AddCircleIcon className={classes.button} />
      </Tooltip>
    </div>
  );
}

const AddButton = withStyles(addButtonStyles)(AddButtonComp);

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

      anchorEl: false,

      addFriend: false,

      currentFriend: {
        name: "",
        number: { country: "IN", number: "", dialCode: "91" },
        email: "",
        key: ""
      },
      friendsToAdd: [],
      editFriendDetails: {
        name: "",
        number: { country: "IN", number: "", dialCode: "91" },
        email: "",
        key: ""
      },
      friendsList: [],

      openFriends: true,
      openGroups: false,
      openActivity: false
    };
  }

  handle3DotsClose = () => {
    this.setState({
      anchorEl: false,
      threeDotsDialog: !this.state.threeDotsDialog
    });
  };

  toggleOptionsDialog = () =>
    this.setState({ optionsDialog: !this.state.optionsDialog });

  toggle3DotsDialog = event => {
    this.setState({
      anchorEl: event.currentTarget,
      threeDotsDialog: !this.state.threeDotsDialog
    });
  };

  toggleThreeDots = () => {
    this.setState({
      addFriendDialog: !this.state.addFriendDialog,
      threeDotsDialog: !this.state.threeDotsDialog
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
        key: ""
      },
      friendsToAdd: []
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
          addMoreFriendsDialog: !this.state.addMoreFriendsDialog
        });
        break;
    }
    if (isNumber) {
      this.setState({
        currentFriend: {
          ...this.state.currentFriend,
          number: { country: "IN", number: currentFriendInput },
          key: dateForKey
        },
        addDetailsDialog: !this.state.addDetailsDialog
      });
    } else if (isEmail) {
      this.setState({
        currentFriend: {
          ...this.state.currentFriend,
          email: currentFriendInput,
          key: dateForKey
        },
        addDetailsDialog: !this.state.addDetailsDialog
      });
    } else {
      this.setState({
        currentFriend: {
          ...this.state.currentFriend,
          key: dateForKey,
          name: currentFriendInput
        },
        addDetailsDialog: !this.state.addDetailsDialog
      });
    }
  };

  toggleWrongInput = () =>
    this.setState({ wrongInputDialog: !this.state.wrongInputDialog });

  toggleAddMoreFriends = currentFriend =>
    this.setState({
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
      friendsToAdd: []
    });

  handleAddMoreFriends = currentFriend =>
    this.setState({
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
      addDetailsDialog: !this.state.addDetailsDialog,
      friendsToAdd: [...this.state.friendsToAdd, currentFriend]
    });

  openAddMoreDetails = currentFriend => {
    this.setState({
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
      addDetailsDialog: !this.state.addDetailsDialog,
      addCountryCode: !this.state.addCountryCode,
      friendsToAdd: [...this.state.friendsToAdd, currentFriend]
    });
  };

  toggleFriendsToAdd = () => {
    this.setState({
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog,
      friendsToAdd: []
    });
  };

  handleRemoveUser = friendKey => {
    let friendsToAdd = this.state.friendsToAdd.filter(
      friend => friend.key !== friendKey
    );
    this.setState({ friendsToAdd });
  };

  toggleConfirmFriends = () => {
    this.setState({
      confirmFriendsDialog: !this.state.confirmFriendsDialog,
      addMoreFriendsDialog: !this.state.addMoreFriendsDialog
    });
  };

  addCountryCode = currentFriend => {
    this.setState({
      addCountryCode: !this.state.addCountryCode,
      currentFriend
    });
  };

  confirmRemoveFriend = key => {
    this.setState({ confirmRemoveFriend: !this.state.confirmRemoveFriend });
  };

  editFriendDetails = key => {
    let friendToEdit = this.state.friendsToAdd.filter(
      friend => friend.key === key
    );

    this.setState({
      editFriendDetails: { ...friendToEdit[0] },
      editFriendDetailsDialog: !this.state.editFriendDetailsDialog
    });
  };

  toggleEditFriendDetailsDialog = () => {
    this.setState({
      editFriendDetailsDialog: !this.state.editFriendDetailsDialog
    });
  };

  toggleConfirmFriendsDialog = () => {
    this.setState({
      confirmFriendsDialog: !this.state.confirmFriendsDialog,
      friendsToAdd: []
    });
  };

  handleAddFriends = () => {
    this.setState(
      prevState => {
        return this.setState({
          confirmFriendsDialog: !this.state.confirmFriendsDialog,
          friendsList: [...this.state.friendsList, ...this.state.friendsToAdd]
        });
      },
      () => this.clearFriendsToAdd
    );
  };

  clearFriendsToAdd = () => {
    this.setState({ friendsToAdd: [] });
  };

  handleEditedFriend = editedFriend => {
    let filteredFriends = this.state.friendsToAdd.filter(
      friend => friend.key !== editedFriend.key
    );
    this.setState({
      friendsToAdd: [...filteredFriends, editedFriend],
      editFriendDetailsDialog: !this.state.editFriendDetailsDialog
    });
  };

  switchTab = tabName => {
    switch (tabName) {
      case "friendsTab":
        this.setState({
          openFriends: true,
          openGroups: false,
          openActivity: false
        });
        break;
      case "groupsTab":
        this.setState({
          openFriends: false,
          openGroups: true,
          openActivity: false
        });
        break;
      case "activityTab":
        this.setState({
          openFriends: false,
          openGroups: false,
          openActivity: true
        });
        break;
    }
  };

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
        {this.state.openGroups && <GroupsTab tabName="groups" />}
        {this.state.openActivity && <ActivityTab />}
        <AddButton
          addExpense={this.addExpense}
          color="secondary"
          tooltip="Add Expense"
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
      </div>
    );
  }
}
