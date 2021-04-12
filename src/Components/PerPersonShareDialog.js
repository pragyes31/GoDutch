import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import SplitEqually from "./SplitEqually";
import SplitUnequally from "./SplitUnequally";
import SplitByPercentage from "./SplitByPercentage";
import SplitByShare from "./SplitByShare";
import SplitByAdjustment from "./SplitByAdjustment";

const PerPersonShareDialogStyles = {
  dialog: {
    width: "400px",
    height: "auto",
    display: "flex",
    padding: "0rem 1rem 2rem 1rem",
  },
  header: {
    textAlign: "center",
    color: "#777",
    margin: "1rem 0rem",
  },
  formControl: {
    display: "flex",
    alignItems: "center",
  },
  selectSplit: {
    width: "12rem",
  },
};

class PerPersonShareDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSplitMode: "equally",
      equally: true,
      unequally: false,
      percentages: false,
      shares: false,
      adjustment: false,
    };
  }
  showSplitWindow = (equally, unequally, percentages, shares, adjustment) => {
    this.setState({
      equally,
      unequally,
      percentages,
      shares,
      adjustment,
    });
  };
  handleSplitChnage = (e) => {
    let currentSplitMode = e.target.value;
    this.setState({ currentSplitMode });
    switch (currentSplitMode) {
      case "equally":
        this.showSplitWindow(true, false, false, false, false);
        break;
      case "unequally":
        this.showSplitWindow(false, true, false, false, false);
        break;
      case "percentages":
        this.showSplitWindow(false, false, true, false, false);
        break;
      case "shares":
        this.showSplitWindow(false, false, false, true, false);
        break;
      case "adjustment":
        this.showSplitWindow(false, false, false, false, true);
        break;
    }
  };
  handleSplit = (contributors) => {
    this.props.handleSplit(contributors);
  };

  render() {
    const {
      classes,
      perPersonShareDialog,
      togglePerPersonShareDialog,
      contributors,
      expenseAmount,
    } = this.props;
    const {} = this.state;
    console.log(this.state.totalAmount);
    return (
      <div className={classes.perPersonShare}>
        <Dialog
          open={perPersonShareDialog}
          aria-labelledby="Each person's share in the expense"
          aria-describedby="Each person's share in the expense"
          onBackdropClick={togglePerPersonShareDialog}
          onEscapeKeyDown={togglePerPersonShareDialog}
          classes={{ paper: classes.dialog }}
        >
          <div className={classes.header}>Enter each person's share</div>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.currentSplitMode}
              onChange={this.handleSplitChnage}
              className={classes.selectSplit}
            >
              <MenuItem value={"equally"}>Split Equally</MenuItem>
              <MenuItem value={"unequally"}>Split Unequally</MenuItem>
              <MenuItem value={"percentages"}>Split by percentages</MenuItem>
              <MenuItem value={"shares"}>Split by shares</MenuItem>
              <MenuItem value={"adjustment"}>Split by adjustment</MenuItem>
            </Select>
          </FormControl>
          {this.state.equally && (
            <SplitEqually
              contributors={contributors}
              expenseAmount={expenseAmount}
              handleSplit={this.handleSplit}
            />
          )}
          {this.state.unequally && (
            <SplitUnequally
              contributors={contributors}
              expenseAmount={expenseAmount}
              handleSplit={this.handleSplit}
            />
          )}
          {this.state.percentages && (
            <SplitByPercentage
              contributors={contributors}
              expenseAmount={expenseAmount}
              handleSplit={this.handleSplit}
            />
          )}
          {this.state.shares && (
            <SplitByShare
              contributors={contributors}
              expenseAmount={expenseAmount}
              handleSplit={this.handleSplit}
            />
          )}
          {this.state.adjustment && (
            <SplitByAdjustment
              contributors={contributors}
              expenseAmount={expenseAmount}
              handleSplit={this.handleSplit}
              />
          )}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(PerPersonShareDialogStyles)(PerPersonShareDialog);
