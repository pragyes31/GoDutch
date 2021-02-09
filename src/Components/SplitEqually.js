import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const splitEquallyStyles = {
  list: {
    display: "flex",
    margin: "1rem 0rem",
    justifyContent: "space-between",
  },
  avatar: {
    width: "35px !important",
    height: "35px !important",
    borderRadius: "50%",
    backgroundImage: `url("https://bit.ly/2UhwGb4")`,
    border: "3px solid #00b8a9",
    marginRight: "10px",
  },
  label: {
    color: "aabbcc",
  },
  perPersonShare: {
    textAlign:"center",
    fontWeight:"bold"
  }
};

class SplitEqually extends React.Component {
  constructor(props) {
    super(props);
    let checked = this.props.contributors.map((contributor) => contributor.id);
    this.state = {
      checkedContributors: this.props.contributors,
      checkedId: checked,
      test: true,
    };
  }
  handleChange = (e, contri) => {
    console.log(e.target.checked);
    let checkedId = this.state.checkedId.includes(contri.id)
      ? this.state.checkedId.filter((id) => id !== contri.id)
      : [...this.state.checkedId, contri.id];
    let checkedContributors = this.state.checkedContributors.filter((contri) =>
      checkedId.includes(contri.id)
    );
    this.setState({ checkedId, checkedContributors });
  };

  render() {
    const { classes, contributors, expenseAmount } = this.props;
    const { checkedContributors, checkedId } = this.state;
    let perPersonShare = expenseAmount / checkedContributors.length;
    return (
      <div className={classes.splitUnequally}>
        {contributors.map((contributor, i) => {
          let { id, name } = contributor;
          return (
            <div className={classes.list} key={id}>
              <div className={classes.avatar}></div>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Checkbox
                    onChange={(e) => this.handleChange(e, contributor)}
                    name={name}
                    checked={checkedId.includes(id)}
                  />
                }
                label={name}
              />
            </div>
          );
        })}
        <div className={classes.perPersonShare}>
          {!!expenseAmount ? <div>INR {perPersonShare}/Person</div> : ""}
        </div>
        <br></br>
      </div>
    );
  }
}

export default withStyles(splitEquallyStyles)(SplitEqually);
