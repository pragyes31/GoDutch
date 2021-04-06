import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const splitByShareStyles = {
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
  shares: {
    width: "4rem",
  },
  ok: {
    textAlign: "right",
    margin: "3rem 1rem 0 0",
    color: "#009900",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "#ff7b25",
    fontWeight: "500",
    textAlign:"center"
  },
  info: {
    textAlign:"center"
  }
};

function SplitByShare(props) {
  const { classes, contributors, expenseAmount } = props;
  const [shares, setShares] = useState({});
  const [totalShares, setTotalShares] = useState(0);
  const [updatedContributors, setContributors] = useState(contributors);
  let handleExpenseSplit = () => {
    props.handleSplit(updatedContributors);
  };
  let handleShares = (id) => (e) => {
    let currentVal = e.target.value !== "" ? parseInt(e.target.value) : 0;
    let localShares = { ...shares, [id]: currentVal };
    const sharesKeys = Object.keys(localShares);
    let localTotal = sharesKeys.reduce(
      (prev, next) => prev + localShares[next],
      0
    );
    let valuePerShare = expenseAmount / localTotal;
    let localContributors = updatedContributors.map((user) => {
      let expenseShare = localShares[user.id] * valuePerShare;
      return { ...user, expenseShare };
    });
    setShares(localShares);
    setTotalShares(localTotal);
    setContributors(localContributors);
  };
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
                className={classes.shares}
                placeholder="0"
                type="number"
                value={shares[id] !== 0 ? shares[id] : ""}
                onChange={handleShares(id)}
                required
              />
            </div>
          </div>
        );
      })}
      {!totalShares ? (
        <div className={classes.error}>
          You must select at least one persone to split with
        </div>
      ) : (
        <div className={classes.info}>Total per share: INR {expenseAmount / totalShares}</div>
      )}
      <div className={classes.ok} onClick={handleExpenseSplit}>
        OK
      </div>
    </div>
  );
}

export default withStyles(splitByShareStyles)(SplitByShare);

// class SplitByShare1 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     const { classes, contributors } = this.props;
//     return (
//       <div className={classes.splitUnequally}>
//         {contributors.map((contributor, i) => {
//           let { id, name } = contributor;
//           return (
//             <div className={classes.list} key={id}>
//               <div className={classes.user}>
//                 <div className={classes.avatar}></div>
//                 <div className={classes.name}>{name}</div>
//               </div>
//             </div>
//           );
//         })}
//         <div className={classes.ok} onClick={this.handleExpenseSplit}>OK</div>

//       </div>
//     );
//   }
// }
