import React from "react";


function Message(props) {
  let messageClass;
  if(props.ownerName.includes(props.name)) {
    messageClass = "message-wrapper owner"
  } else {
    messageClass = "message-wrapper";
  }

  return (
    <div className={messageClass}>
      <div className="message-content">
        <div className="info">
      <h4 className="name">{props.name}</h4>
      <p className="time">{props.getTime(props.time)}</p>
      </div>
      <p className="message">{props.message} </p>
      </div>
    </div>
  );
}

export default Message;
