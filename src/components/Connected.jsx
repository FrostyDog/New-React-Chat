import React from "react";

function Connected(props) {
  if (props.stance === "connected") {
    return <h4> U have been connected</h4>;
  } else return <h4 className = "hidden"> U have been connected</h4>;
}

export default Connected;

