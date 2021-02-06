import React from "react";
import { withStyles } from "@material-ui/core/styles";

const FriendsInDashboardStyles = {
  friendsList: {
    padding: "10px 20px"
  },
  avatar: {
    width: "45px !important",
    height: "40px !important",
    borderRadius: "50%",
    backgroundImage: `url("https://bit.ly/2UhwGb4")`,
    border: "3px solid #00b8a9",
    marginRight: "10px"
  },
  friend: {
    display: "flex",
    justifyContent: "space-between",
    marginTop:"1rem"
  },
  left: {
    display: "flex",
    alignItems: "center"
  },
  FriendName: {

  },
  right: {
    display: "flex",
    alignItems: "center"
  }
};

class FriendsInDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: false
    };
  }
  render() {
    const { classes, friendsList } = this.props;
    return (
        
      <div className={classes.friendSummary}>
          {friendsList.map((friend) => {
              if(friend.balance) {
                return (
                  <div className={classes.friend}>
                  <div className={classes.left}>
                    <div className={classes.avatar} />
                    <div className={classes.FriendName}>{friend.name}</div>
                  </div>
                  <div className={classes.right}>{friend.balance}</div>
                </div>
                )
              }
          })}
      </div>
    );
  }
}

export default withStyles(FriendsInDashboardStyles)(FriendsInDashboard);
