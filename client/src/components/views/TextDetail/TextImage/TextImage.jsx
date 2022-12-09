import React, { useEffect, useRef } from "react";
import { utilities } from "../../../../utils/utilities.js";

export default function TextImage({ text }) {
  const textImage = useRef(null);

  useEffect(() => {
    utilities.scrollTo(textImage);
  }, [textImage]);
  return (
    <div
      ref={textImage}
      className="text-image-background"
      style={{
        backgroundImage: `url(${text?.picUrl})`,
      }}
    >
      <div
        className="text-complete-image"
        style={{
          backgroundImage: `url(${text?.picUrl})`,
        }}
      ></div>
    </div>
  );
}
