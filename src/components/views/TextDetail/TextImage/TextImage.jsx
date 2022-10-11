import React, { useEffect, useRef } from "react";
import { executeScroll } from "../../../../utils/scrollTo";

export default function TextImage({ text }) {
  const textImage = useRef(null);

  useEffect(() => {
    executeScroll(textImage);
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
