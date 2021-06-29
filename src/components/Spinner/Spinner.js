import React from "react";

import "./Spinner.css";

function Spinner(props) {
  return (
    <div className={`spinner ${props.small ? "spinner-small" : ""}`}>
      <div
        className={`pulse-spinner ${props.small ? "spinner-small" : ""}`}
      ></div>
    </div>
  );
}

export default Spinner;
