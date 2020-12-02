import React from "react";

import { withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Dialog from "@material-ui/core/Dialog";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class AddFriend extends React.Component {
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
  
  export default withStyles(addFriendStyles)(AddFriend);
  