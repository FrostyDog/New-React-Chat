import React from "react";

function Disconnect(props) {
  if (props.stance === "disconnected") {
    return <h4> Connection lost :(</h4>;
  } else return null;
}

export default Disconnect;
