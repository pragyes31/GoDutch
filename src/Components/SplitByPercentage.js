import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const splitByPercentageStyles = {
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
  user: {
    display: "flex",
    alignItems: "center",
  },
  percentValue: {
    width: "4rem",
  },
  ok: {
    textAlign: "right",
    margin: "3rem 1rem 0 0",
    color: "#009900",
    cursor: "pointer",
    fontWeight: "bold",
  },
  total: {
    textAlign:"center",
    fontSize:"2rem"
  },
  error: {
    color: "#ff7b25",
    fontWeight: "500",
  },
};

class SplitByPercentage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageShare: {},
      total: 0.0,
      error: false,
    };
  }

  handlePercentageShare = (id) => (e) => {
    let { percentageShare } = this.state;
    let currentVal = parseInt(e.target.value !== "NaN" ? e.target.value : "");
    let upadatedPercentageShare = { ...percentageShare, [id]: currentVal };
    const keys = Object.keys(percentageShare);

    let total = 0;
    keys.forEach((key) => {
      total += upadatedPercentageShare[key] !== "NaN" ? upadatedPercentageShare[key] : 0;
    });
    console.log(total);
    if (total > 100) {
      this.setState({
        percentageShare: upadatedPercentageShare,
        total,
        error: true,
      });
    } else {
      this.setState({ 
        percentageShare: upadatedPercentageShare,
        total,
        error: false,
      });
    }
  };

  handleExpenseSplit = () => {
    const { percentageShare, total } = this.state;
    const {expenseAmount, contributors} = this.props;
if(total === 100) {
let contributorsUpdated = contributors.map((person) => {
 let expenseShare = (percentageShare[person.id]*expenseAmount)/100
  return {...person, expenseShare }
})
console.log(contributorsUpdated)
this.props.handleSplit(contributorsUpdated)

}
else {
console.log("expense doesn't match up");
}
  }

  render() {
    const { classes, contributors } = this.props;
    const { percentageShare, total, error } = this.state;
    return (
      <div className={classes.splitUnequally}>
        {contributors.map((contributor, i) => {
          let { id, name } = contributor;
          return (
            <div className={classes.list} key={id}>
              <div className={classes.user}>
                <div className={classes.avatar}></div>
                <div className={classes.name}>{name}</div>
              </div>
              <div>
                <TextField
                  id="description"
                  className={classes.percentValue}
                  placeholder="0"
                  type="number"
                  value={percentageShare[id] || ""}
                  onChange={this.handlePercentageShare(id)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          );
        })}
        <div className={classes.total, error ? classes.error : undefined}>Total:{total}% of 100%</div>
        <div>{100 - total}% left</div>
        <div className={classes.ok} onClick={this.handleExpenseSplit}>
          OK
        </div>
      </div>
    );
  }
}

export default withStyles(splitByPercentageStyles)(SplitByPercentage);
