import React, { useRef, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import Navbar from "../Navbar/Navbar";
import Board from "./Board/Board";
import Spinner from "../Spinner/Spinner";
import "./Main.css";

function Main() {
  const input = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [board, setBoard] = useState("");

  const submission = (e) => {
    e.preventDefault();

    if (!input.current.value) return;
    const regex =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
    let value = input.current.value.trim().toLowerCase();
    if (!regex.test(value)) {
      setErrorMsg("Invalid Domain name");
      return;
    }
    setErrorMsg("");
    if (!(value.includes("https://") || value.includes("http://"))) {
      value = "https://" + value;
    }

    setBoard(
      <div style={{ marginTop: "80px" }}>
        <Spinner />
      </div>
    );

    fetch(`${process.env.REACT_APP_SERVER}/req/check`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url: value,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          setBoard("");
          return;
        }
        setBoard(
          <Board
            name={input.current.value}
            down={data.down}
            message={data.message}
            url={data.data.url}
            responseTime={`${data.data.responseTime / 1000} sec`}
            statusCode={data.data.statusCode}
          />
        );
      })
      .catch((err) => {
        setErrorMsg("Error connecting to server");
        setBoard("");
      });
  };

  return (
    <div className="main">
      <svg viewBox="0 0 1440 320" className="main_wave">
        <path
          fill="#fff"
          fillOpacity="0.97"
          d="M0,32L48,64C96,96,192,160,288,160C384,160,480,96,576,80C672,64,768,96,864,128C960,160,1056,192,1152,213.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <Navbar />

      <div
        style={{
          height: "fit-content",
          marginTop: "65px",
          paddingBottom: "5px",
        }}
      >
        <h1 className="main_heading">
          check <span>STATUS</span> of your website and set a reminder for
          future regular updates.
        </h1>

        <form onSubmit={submission}>
          <input ref={input} type="text" placeholder="Enter URL" />
          <button type="submit">
            <SearchIcon />
          </button>
        </form>
        <span className="field-error-msg">{errorMsg}</span>
        {board}
      </div>
    </div>
  );
}

export default Main;
