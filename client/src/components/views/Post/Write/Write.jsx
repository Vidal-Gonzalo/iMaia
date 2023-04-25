import React from "react";
import TextImage from "../../TextDetail/TextImage/TextImage";

const defaultImage = "https://huellas01.web.app/css/img/topWriting-1.jpg";
const title = "Hola mundo";

export default function Write() {
  return (
    <div className="write-container">
      {defaultImage && <TextImage picUrl={defaultImage} />}
      <div className="write-info">
        <div className="write-title">
          <h5>{title}</h5>
        </div>
        <div className="write-text">
          <input type="textarea" />
        </div>
      </div>
    </div>
  );
}
