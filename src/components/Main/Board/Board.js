import React from "react";
import DoneIcon from "@material-ui/icons/DoneOutline";
import DownIcon from "@material-ui/icons/DesktopAccessDisabled";

function Board(props) {
  return (
    <div className="main_board_container">
      <h2 style={{ padding: "10px" }}>
        <a
          href={props.url}
          target="_blank"
          rel="noreferrer"
          style={{ color: props.down ? "red" : "var(--secondary-color)" }}
        >
          {props.name?.substr(0, 32)}{" "}
        </a>
        status check
      </h2>
      {/* <hr /> */}
      <div className="main_board">
        <div className="board_left">
          <div
            style={{
              padding: "18px",
              margin: "8px auto",
              borderRadius: "50%",
              backgroundColor: `${
                props.down ? "red" : "var(--secondary-color)"
              }`,
              width: "fit-content",
            }}
          >
            {props.down ? (
              <DownIcon className="board_icon" />
            ) : (
              <DoneIcon className="board_icon" />
            )}
          </div>
          {props.down ? <h3>Down</h3> : <h3>Up</h3>}
        </div>
        <div className="board_right">
          <div className="board_right_item">
            <p>Website name : </p>
            <p style={{ marginLeft: "15px" }}>{props.name}</p>
          </div>
          <hr />
          <div className="board_right_item">
            <p>Status </p>
            <p style={{ marginLeft: "15px" }}>{props.down ? "Down" : "Up"}</p>
          </div>
          <hr />
          <div className="board_right_item">
            <p>URL checked </p>
            <p style={{ marginLeft: "15px" }}>{props.url}</p>
          </div>
          <hr />
          <div className="board_right_item">
            <p>Status Code</p>
            <p style={{ marginLeft: "15px" }}>{props.statusCode}</p>
          </div>
          <hr />
          <div className="board_right_item">
            <p>Response Time </p>
            <p style={{ marginLeft: "15px" }}>{props.responseTime}</p>
          </div>
        </div>
      </div>
      <h4
        style={{
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "3px",
        }}
      >
        {props.message}
      </h4>
    </div>
  );
}

export default Board;
