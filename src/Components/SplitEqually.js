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
    textAlign: "center",
    fontWeight: "bold",
  },
  user: {
    display: "flex",
    alignItems: "center",
  },
  ok: {
    textAlign:"right",
    margin:"3rem 1rem 0 0",
    color:"#009900",
    cursor: "pointer",
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
    };
  }
  handleChange = (e, contri) => {
    let checkedId = this.state.checkedId.includes(contri.id)
      ? this.state.checkedId.filter((id) => id !== contri.id)
      : [...this.state.checkedId, contri.id];

    let checkedContributors = this.state.checkedId.includes(contri.id)
      ? this.state.checkedContributors.filter((contri) =>
          checkedId.includes(contri.id)
        )
      : [...this.state.checkedContributors, contri];

    this.setState({ checkedId, checkedContributors });
  };

  handleSaveSplit = (checkedContributors, expenseShare) => {
    let checkedContributorsUpdated = checkedContributors.map((person) => {
return {...person, expenseShare}
    })
    console.log(checkedContributorsUpdated)
  }

  render() {
    const { classes, contributors, expenseAmount } = this.props;
    const { checkedContributors, checkedId } = this.state;
    let perPersonShare = expenseAmount / checkedContributors.length;
    return (
      <div className={classes.splitEequally}>
        {contributors.map((contributor, i) => {
          let { id, name } = contributor;
          return (
            <div className={classes.list} key={id}>
              <div className={classes.user}>
                <div className={classes.avatar}></div>
                <div className={classes.name}>{name}</div>
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => this.handleChange(e, contributor)}
                    name={name}
                    checked={checkedId.includes(id)}
                  />
                }
              />
            </div>
          );
        })}
        <div className={classes.perPersonShare}>
          {!!expenseAmount || perPersonShare < 0 ? <div>INR {perPersonShare}/Person</div> : ""}
        </div>
        <div className={classes.ok} onClick={() => this.handleSaveSplit(checkedContributors, perPersonShare)}>OK</div>
      </div>
    );
  }
}

export default withStyles(splitEquallyStyles)(SplitEqually);
