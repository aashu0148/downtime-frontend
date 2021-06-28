import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar(props) {
  const history = useHistory();

  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="title">DownTime</h1>
      </Link>
      {history.location.pathname.includes("dashboard") ? (
        <Link
          onClick={props.logoutAction}
          to="/"
          style={{ textDecoration: "none" }}
        >
          <p>Logout</p>
        </Link>
      ) : (
        <Link to="dashboard" style={{ textDecoration: "none" }}>
          <p>Dashboard</p>
        </Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch({ type: "LOGOUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
