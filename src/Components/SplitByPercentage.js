import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


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
};

class SplitByPercentage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageShare: {},
    };
  }

  handlePercentageShare = (e, id) => {
    this.setState({
      percentageShare: { ...this.state.percentageShare, [id]: e.target.value },
    });
  };

  render() {
    const { classes, contributors } = this.props;
    const { percentageShare } = this.state;
    console.log(percentageShare)
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
                  className={classes.expenseValue}
                  placeholder="0"
                  type="number"
                  value={percentageShare[id] || 0}
                  onChange={() => this.handlePercentageShare(id)}
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

export default withStyles(splitByPercentageStyles)(SplitByPercentage);

{
  /*
const [values, setValues] = useState(initialValues);

// ....

const handleChange = userId => e => {
  setValues(values => ({ ...values, [userId]: e.target.value }));
}

users.map(user => <input key={user.id} value={values[user.id]} type="text" onChange={handleChange(user.id)} />);
*/
}
