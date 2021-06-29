import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import extractDomain from "extract-domain";

import Navbar from "../Navbar/Navbar";
import Spinner from "../Spinner/Spinner";
import Strip from "./Strip/Strip";
import "./Dashboard.css";

function Dashboard(props) {
  const inputUrl = useRef();

  const [errorMsg, setErrorMsg] = useState("");
  const [addWebsiteErrorMsg, setAddWebsiteErrorMsg] = useState("");
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [websites, setWebsites] = useState(<Spinner />);

  function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }

  const deleteStrip = (data, index) => {
    const myData = [...data];
    myData.splice(index, 1);

    const result = myData.map((item, i) => (
      <Strip
        key={i + item.url}
        down={item.down}
        uid={props.uid}
        name={extractDomain(item.url)}
        url={item.url}
        responseTime={`${item.responseTime / 1000} sec`}
        statusCode={item.statusCode}
        onDelete={() => {
          deleteStrip(myData, i);
        }}
      />
    ));

    setWebsites(result);
  };

  const addWebsiteHandler = (e) => {
    e.preventDefault();

    const value = inputUrl.current.value;
    if (!value) return;

    if (!validateUrl(value)) {
      setAddWebsiteErrorMsg(
        "Invalid URL, valid URL example - https://abc@xyz.com or http://adc@xyz.com"
      );
      return;
    }

    setAddWebsiteErrorMsg("");
    setAddButtonDisabled(true);

    fetch(`${process.env.REACT_APP_SERVER}/dashboard/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uid: props.uid,
        url: inputUrl.current.value,
      }),
    })
      .then(async (res) => {
        setAddButtonDisabled(false);
        const data = await res.json();
        if (!data.status) {
          setAddWebsiteErrorMsg(data.message);
          return;
        }
        e.target.reset();
        window.location.href = "/dashboard";
      })
      .catch(() => {
        setAddButtonDisabled(false);
        setAddWebsiteErrorMsg("Error connecting to server");
      });
  };

  useEffect(() => {
    if (!props.uid) return;
    fetch(`${process.env.REACT_APP_SERVER}/dashboard/get-url/${props.uid}`)
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          setWebsites([]);
          return;
        }

        const result = data.data.map((item, i) => (
          <Strip
            key={i}
            down={item.down}
            uid={props.uid}
            name={extractDomain(item.url)}
            url={item.url}
            responseTime={`${item.responseTime / 1000} sec`}
            statusCode={item.statusCode}
            onDelete={() => {
              deleteStrip(data.data, i);
            }}
          />
        ));

        setWebsites(result);
      })
      .catch(() => {
        setErrorMsg("Error connecting to server");
        setWebsites([]);
      });
  }, [props.uid]);

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

      <div className="dashboard_body">
        <h1 style={{ marginBottom: "10px" }}>Your Websites</h1>
        <p>{errorMsg}</p>
        {websites}

        <br />
        <hr />
        <br />
        <h2>
          Add Website -{" "}
          <span style={{ fontSize: "var(--font-medium)" }}>
            If any of your website go down we will notify you on your registered
            email.
          </span>
        </h2>
        <form onSubmit={addWebsiteHandler}>
          <div className="field-form-elem">
            <label>URL</label>
            <input ref={inputUrl} type="text" placeholder="Enter URL" />
          </div>
          {/* <div className="field-form-elem">
            <label>Email to send notification</label>
            <input type="email" placeholder="Enter email" />
          </div> */}
          <p className="field-error-msg">{addWebsiteErrorMsg}</p>
          <button
            disabled={addButtonDisabled}
            className={`button ${addButtonDisabled ? "button-disabled" : ""}`}
            type="submit"
          >
            {addButtonDisabled ? "Loading..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    uid: state.id,
    preloading: state.preloading,
  };
};

export default connect(mapStateToProps)(Dashboard);
