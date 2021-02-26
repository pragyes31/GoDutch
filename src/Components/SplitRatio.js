import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const splitRatioStyles = {
  
};

class AmountPaidByPerPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.amountPaid}>
          
      </div>
    );
  }
}

export default withStyles(AmountPaidByPerPersonStyles)(AmountPaidByPerPerson);
