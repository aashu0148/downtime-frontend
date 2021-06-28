import React, { useState } from "react";
import { Link } from "react-router-dom";

import Signin from "./form/Signin";
import Signup from "./form/Signup";
import "./Login.css";

function Login() {
  const changeForm = (form) => {
    switch (form) {
      case "signin":
        setForm(<Signin changeForm={changeForm} />);
        break;
      case "signup":
        setForm(<Signup changeForm={changeForm} />);
        break;
      default:
        setForm(<Signin changeForm={changeForm} />);
        break;
    }
  };

  const [form, setForm] = useState(<Signin changeForm={changeForm} />);

  return (
    <div className="login">
      <svg className="login_wave" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L30,37.3C60,75,120,149,180,165.3C240,181,300,139,360,149.3C420,160,480,224,540,240C600,256,660,224,720,208C780,192,840,192,900,165.3C960,139,1020,85,1080,58.7C1140,32,1200,32,1260,26.7C1320,21,1380,11,1410,5.3L1440,0L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>

      <div style={{ padding: "5px 15px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="title">DownTime</h1>
        </Link>
      </div>

      <div
        style={{
          flex: "10",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login_form_container">{form}</div>
      </div>
    </div>
  );
}

export default Login;
