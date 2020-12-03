import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const userBalanceStyles = {
    userInfo: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    avatar: {
      minWidth: "55px !important",
      height: "50px !important",
      borderRadius: "50%",
      backgroundImage: `url("https://bit.ly/2UhwGb4")`,
      border: "3px solid #00b8a9",
      marginRight: "10px"
    }
  };
  
  function UserBalance(props) {
    const { classes } = props;
    return (
      <div className={classes.userInfo}>
        <div className="user__info__avatar">
          <div className={classes.avatar} />
        </div>
        <div className="user__info__balance">
          <Typography>TOTAL BALANCE</Typography>
          <Typography>You are all settled up.</Typography>
        </div>
      </div>
    );
  }
  
  export default withStyles(userBalanceStyles)(UserBalance);
  