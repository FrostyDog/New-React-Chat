import React from "react";

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      msgIn: "",
      nameIn: "",
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.pressEnter = this.pressEnter.bind(this);
  }

  userName = localStorage.getItem("userName");

  // LifeCycle

  componentDidMount() {
    // Chchecking for name in localStorage
    if (this.userName) {
      this.setState({
        nameIn: localStorage.getItem("userName"),
      });
    }
    // Enter on a document level
    document.addEventListener("keydown", this.pressEnter, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.pressEnter, false);
  }

  // Functions

  submitMessage(e) {
    if (this.state.msgIn === "") {
      alert("Enter message");
    } else {
      e.preventDefault();

      // Setting UserName on sending msg
      if (!this.userName || this.userName !== this.state.nameIn) {
        localStorage.setItem("userName", this.state.nameIn);
      }

      // sending messages
      this.props.SendMessage(this.state.nameIn, this.state.msgIn);
      this.setState({
        msgIn: "",
      });
    }
  }

  pressEnter = (e) => {
    if (e.key === "Enter") {
      this.submitMessage(e);
    }
  };

  render() {
    return (
      <div className="input-wrapper">
        <div className="name-wrapper">
          <input
            className="name"
            type="name"
            placeholder="Your name"
            value={this.state.nameIn}
            onChange={(e) => {
              this.setState({ nameIn: e.target.value });
            }}
          />
          <button className="close" onClick={this.props.wsClose}>
            Close and Recconect
            <span>
              <i className="fas fa-plug"></i>
            </span>
          </button>
        </div>

        <textarea
          className="message"
          placeholder="type your message here"
          type="text"
          value={this.state.msgIn}
          onChange={(e) => {
            this.setState({ msgIn: e.target.value });
          }}
        />
        <button type="submit" className="send" onClick={this.submitMessage}>
          Send
          <span>
            <i className="fas fa-arrow-up"></i>
          </span>
        </button>
      </div>
    );
  }
}

export default Input;
