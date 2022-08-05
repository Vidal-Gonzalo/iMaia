import React from "react";
import "./Button.css";

export default function Button({ action, text }) {
  return (
    <button className="btn" onClick={action}>
      {text}
    </button>
  );
}
