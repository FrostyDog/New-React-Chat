import React from "react";
import Input from "./Input";
import Message from "./Message";
import Disconnect from "./Disconnect";
import Connected from "./Connected";
import { connect } from "react-redux";

class Chat extends React.Component {
  constructor(props) {
    super();
    this.state = {
      stance: "",
      ownerName: "",
    };
    this.getTime = this.getTime.bind(this);
    this.notifyMe = this.notifyMe.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  // WS event listeners
  componentDidMount() {
    this.connect();
    this.notifyMe();
    this.setState({ ownerName: [localStorage.getItem("userName")] });
  }

  // Functions

  // Openning WS connection
  connect = () => {
    this.ws = new WebSocket("ws://st-chat.shas.tel");

    // Opening connection with animation after 5s
    this.ws.onopen = () => {
      console.log("connected");
      this.props.dispatch({ type: "CLEAR_MESSAGES" });
      this.setState({
        stance: "connected",
      });
    };

    setTimeout(() => {
      this.setState({
        stance: "waiting",
      });
    }, 5000);

    this.ws.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      this.props.dispatch({ type: "ADD_MESSAGES", payload: newMessage });
      this.props.messages.sort((a, b) => a.time - b.time);
      this.scrollToBottom("messages-wrapper");

      //Setting Notifications
      if (document.visibilityState !== "visible") {
        let notification = new Notification(
          "New Message from " + newMessage[0].from
        );
        setTimeout(() => notification.close(), 3000);
      }
    };

    this.wsClose = () => {
      this.ws.close();
    };

    // Recconection on connection closed

    this.ws.onclose = () => {
      console.log("disconnected");
      this.setState({
        stance: "disconnected",
      });

      this.reconnect = setInterval(() => {
        console.log("connecting");
        this.connect();
      }, 3000);
    };

    this.ws.onerror = function (err) {
      console.error(err);
    };

    // clearing Interval

    if (this.reconnect) {
      console.log("clearing Interval");
      clearInterval(this.reconnect);
    }
  };

  // Utility Functions

  scrollToBottom = (id) => {
    const myDiv = document.getElementById(id);
    myDiv.scrollTop = myDiv.scrollHeight;
  };

  notifyMe = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          const WelcomeNotification = new Notification(
            "Welcome to the Epic Chat"
          );
          setTimeout(() => WelcomeNotification.close(), 3000);
        }
      });
    }
  };

  submitMessage = (nameUser, messageText) => {
    if (!this.state.ownerName.includes(localStorage.getItem("userName"))) {
      this.setState({
        ownerName: [...this.state.ownerName, localStorage.getItem("userName")],
      });
    }
    const message = { from: nameUser, message: messageText };
    this.ws.send(JSON.stringify(message));
  };

  getTime = (timeFromServer) => {
    if (!timeFromServer) {
      return;
    }

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    let date = new Date(timeFromServer);
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
      date.getSeconds()
    )}`;
  };

  render() {
    return (
      <div>
        <div className="header">
          <h1>Epic Chat</h1>
          <Connected stance={this.state.stance} />
          <Disconnect stance={this.state.stance} />
        </div>
        <Input SendMessage={this.submitMessage} wsClose={this.wsClose} />
        <div className="messages-wrapper" id="messages-wrapper">
          {this.props.messages.map((message, index) => (
            <Message
              ownerName={this.state.ownerName}
              key={index}
              getTime={this.getTime}
              time={message.time}
              name={message.from}
              message={message.message}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Chat);
