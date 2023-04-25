import React, { useEffect, useRef } from "react";
import { utilities } from "../../../../utils/utilities.js";

export default function TextImage({ picUrl }) {
  const textImage = useRef(null);

  useEffect(() => {
    utilities.scrollTo(textImage);
  }, [textImage, picUrl]);

  console.log(picUrl);

  return (
    <div
      ref={textImage}
      className="text-image-background"
      style={{
        backgroundImage: `url(${picUrl})`,
      }}
    >
      <div
        className="text-complete-image"
        style={{
          backgroundImage: `url(${picUrl})`,
        }}
      ></div>
    </div>
  );
}
