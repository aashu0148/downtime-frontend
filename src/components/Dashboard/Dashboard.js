import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Spinner from "../Spinner/Spinner";
import "./Dashboard.css";

function Dashboard(props) {
  return props.preloading ? (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  ) : props.auth ? (
    <div className="dashboard">
      <svg className="wave" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,320L34.3,282.7C68.6,245,137,171,206,160C274.3,149,343,203,411,229.3C480,256,549,256,617,229.3C685.7,203,754,149,823,133.3C891.4,117,960,139,1029,128C1097.1,117,1166,75,1234,96C1302.9,117,1371,203,1406,245.3L1440,288L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
      <Navbar />
      <h1>Dashboard</h1>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    preloading: state.preloading,
  };
};

export default connect(mapStateToProps)(Dashboard);
