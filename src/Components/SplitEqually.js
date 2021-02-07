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
};

class SplitEqually extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedContributors: this.props.contributors,
    };
  }
  handleChange = (e, contri) => {
    const { checkedContributors } = this.state;
    let updatedContributors = checkedContributors.includes()
      ? checkedContributors.filter((c) => c !== x)
      : [...checkedContributors, x];
  };
  render() {
    const { classes, contributors } = this.props;
    const { checkedContributors } = this.state;
    return (
      <div className={classes.splitUnequally}>
        {contributors.map((contributor, i) => {
          let { key, name } = contributor;
          return (
            <div className={classes.list} key={key}>
              <div className={classes.avatar}></div>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox onChange={this.handleChange} name={name} />}
                label={name}
                checked={checkedContributors.includes(key)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(splitEquallyStyles)(SplitEqually);
