import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jwt from "jsonwebtoken";
import secretKey from "./secret";

import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App(props) {
  const token = JSON.parse(localStorage.getItem("downtime"));

  useEffect(() => {
    if (token) {
      jwt.verify(token, secretKey, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        fetch(`${process.env.REACT_APP_SERVER}/user/token-signin`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        })
          .then(async (res) => {
            const data = await res.json();
            if (!data.status) {
              return;
            }

            props.loginAction(data.data);
            setTimeout(() => {
              props.loadedAction();
            }, 300);
          })
          .catch(() => {
            props.loadedAction();
          });
      });
    } else {
      props.loadedAction();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/login">
            {props.auth ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/" exact>
            <Main />
          </Route>
        </Switch>
      </Router>
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
    loadedAction: () => dispatch({ type: "LOADED" }),
    loginAction: (data) =>
      dispatch({
        type: "LOGIN",
        name: data.name,
        email: data.email,
        id: data._id,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
