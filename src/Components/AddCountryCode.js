
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiPhoneNumber from "material-ui-phone-number";


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
  
  class AddCountryCode extends React.Component {
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
  
  export default withStyles(addCountryCodeStyles)(AddCountryCode);
  