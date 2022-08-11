import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TextDetail() {
  const { id } = useParams();
  useEffect(() => {
    document.title = `iMaia - ${id}`;
  }, [id]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        width: "100vw",
        height: "50vh",
        backgroundColor: "#000",
      }}
    >
      <p style={{ color: "white" }}>{id}</p>
    </div>
  );
}
