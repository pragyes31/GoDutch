import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const splitUnequallyStyles = {
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
  unequalShare: {
    width: "4rem",
  },
  ok: {
    textAlign: "right",
    margin: "3rem 1rem 0 0",
    color: "#009900",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

class SplitUnequally extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors:this.props.contributors
    };
  }

  handleShare = (i, id) => (e) => {
    const { contributors } = this.state;
    let expenseShare = parseInt(e.target.value !== "NaN" ? e.target.value : 0);
    let contributorsUpdated = contributors.map((contributor) =>
      contributor.id === id ? { ...contributor, expenseShare } : {...contributor}
    );
    console.log(contributorsUpdated)
    this.setState({contributors:contributorsUpdated})
  };

  render() {
    const { classes } = this.props;
    const { contributors } = this.state;
    console.log(contributors)
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
                  className={classes.unequalShare}
                  placeholder="0"
                  type="number"
                  value={contributor.expenseShare}
                  onChange={this.handleShare(i, id)}
                  required
                />
              </div>
            </div>
          );
        })}
        <div className={classes.ok} onClick={this.handleExpenseSplit}>
          OK
        </div>
      </div>
    );
  }
}

export default withStyles(splitUnequallyStyles)(SplitUnequally);
