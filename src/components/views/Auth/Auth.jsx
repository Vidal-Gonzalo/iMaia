import React, { useEffect, useState } from "react";
import authBackground from "../../../assets/images/authBackground.jpg";
import authGirl from "../../../assets/images/authGirl.png";
import "./Auth.css";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

export default function Auth() {
  const [formMode, setFormMode] = useState("login");

  useEffect(() => {
    document.title = `${
      formMode === "login" ? "Inicia sesión" : "Regístrate"
    } - iMaia`;
  }, [formMode]);

  const changeForm = () => {
    formMode === "login" ? setFormMode("register") : setFormMode("login");
  };

  return (
    <section className="auth-section">
      <div className="form-container">
        {formMode === "login" ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} />
        )}
      </div>
      <div
        className="auth-presentation"
        style={{
          backgroundImage: `url(${authBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h4>Nuevas experiencias te aguardan</h4>
        <img src={authGirl} alt="Girl reading" />
      </div>
    </section>
  );
}
