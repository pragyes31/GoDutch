import React from "react";

import { withStyles } from "@material-ui/core/styles";
import UserBalance from './UserBalance'
import FilterDialog from './FilterDialog'
import FilterListIcon from "@material-ui/icons/FilterList";


const groupsTabStyles = {
    user: {
      width: "100%",
      height: "80px",
      backgroundColor: "#eada82",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    filter: {
      position: "relative"
    },
    filterBtn: {
      minWidth: "35px !important",
      height: "30px !important",
      border: "2px solid black",
      borderRadius: "50%",
      cursor: "pointer",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  };
  
  class GroupsTab extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterDialog: false
      };
    }
    toggleDialog = () =>
      this.setState({ filterDialog: !this.state.filterDialog });
  
    render() {
      const { classes } = this.props;
      return (
        <div className={this.props.tabName}>
          <div className={classes.user}>
            <UserBalance />
            <div className={classes.filter}>
              <FilterListIcon
                className={classes.filterBtn}
                onClick={this.toggleDialog}
              />
              {this.state.filterDialog && (
                <FilterDialog
                  tabName={this.props.tabName}
                  filterDialog={this.state.filterDialog}
                  toggleDialog={this.toggleDialog}
                />
              )}
            </div>
          </div>
          <div />
        </div>
      );
    }
  }
  
export default withStyles(groupsTabStyles)(GroupsTab);
  