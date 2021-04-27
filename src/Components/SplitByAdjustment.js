import React from "react";
import { withStyles } from "@material-ui/core/styles";

const splitByAdjustmentStyles = {
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
    display:"flex",
    alignItems:"center"
  }
};

// class SplitByAdjustment extends React.Component {
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

function SplitByAdjustment(props) {
  const { classes, contributors } = props;
let handleExpenseSplit = () => {
  
}
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
            </div>
          );
        })}
        <div className={classes.ok} onClick={handleExpenseSplit}>OK</div>
      </div>
)
}

export default withStyles(splitByAdjustmentStyles)(SplitByAdjustment);
