import React from "react";
import ImageIcon from "@mui/icons-material/Image";

export default function PostImage() {
  return (
    <div className="post-image">
      <div className="add-image">
        <ImageIcon sx={{ fontSize: "5rem", color: "grey" }} />
        <p>Añade tu portada</p>
      </div>
    </div>
  );
}
