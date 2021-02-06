handlePayee = (payee) => {
    switch (payee) {
      case "youPaidSplitEqual":
        this.setState({
          youPaidSplitEqual: true,
          youOwnFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: false,
          whoPaidText: "Paid by YOU and split EQUALLY",
        });
        break;
      case "youOwnFull":
        this.setState({
          youPaidSplitEqual: false,
          youOwnFull: true,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: false,
          whoPaidText: "You owe the full amount",
        });
        break;
      case "theyOweFull":
        this.setState({
          youPaidSplitEqual: false,
          youOwnFull: false,
          theyOweFull: true,
          theyPaidSplitEqual: false,
          moreOptions: false,
          whoPaidText: "They owe the full amount",
        });
        break;
      case "theyPaidSplitEqual":
        this.setState({
          youPaidSplitEqual: false,
          youOwnFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: true,
          moreOptions: false,
          whoPaidText: "Paid by the other person and split EQUALLY",
        });
        break;
      case "moreOptions":
        this.setState({
          youPaidSplitEqual: false,
          youOwnFull: false,
          theyOweFull: false,
          theyPaidSplitEqual: false,
          moreOptions: true,
        });
        break;
    }
    this.setState({ whoPaidDialog: !this.state.whoPaidDialog });
  };

  export default handlePayee;