import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

const choosePayerStyles = {
  dialog: {
    width: "400px",
    height: "auto",
    display: "flex",
    padding: "0rem 1rem 2rem 1rem",
  },
  avatar: {
    width: "35px !important",
    height: "35px !important",
    borderRadius: "50%",
    backgroundImage: `url("https://bit.ly/2UhwGb4")`,
    border: "3px solid #00b8a9",
    marginRight: "10px",
  },
  payer: {
    display: "flex",
    alignItems: "center",
    marginTop: "0.7rem",
    cursor: "pointer",
  },
  name: {
    margin: "1rem",
  },
  multiple: {
    margin: "1rem 0 0.5rem 0.5rem",
    cursor: "pointer",
  },
};

class ChoosePayerDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes,
      toggleChoosePayerDialog,
      choosePayerDialog,
      contributors,
      handlePayer,
      handleMultiplePeople,
    } = this.props;
    return (
      <div className={classes.choosePayerDialog}>
        <Dialog
          open={choosePayerDialog}
          aria-labelledby="Choose payer "
          aria-describedby="Choose payer"
          onBackdropClick={toggleChoosePayerDialog}
          onEscapeKeyDown={toggleChoosePayerDialog}
          classes={{ paper: classes.dialog }}
        >
          <h3>Choose payer</h3>
          {contributors.map((payer) => {
            return (
              <div key={payer.id} className={classes.payer} onClick={() => handlePayer(payer)}>
                <div className={classes.avatar}></div>
                <div className={classes.name}>{payer.name}</div>
              </div>
            );
          })}
          <div className={classes.multiple} onClick={handleMultiplePeople}>
            Multiple people
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(choosePayerStyles)(ChoosePayerDialog);
