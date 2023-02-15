import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./UnderlinedLink.css";

export default function UnderlinedLink({ params1, params2, text }) {
  const AnimatedLink = motion(Link);
  const underlineVariants = {
    hidden: {
      width: 0,
    },
    visible: {
      width: "100%",
    },
  };
  return (
    <AnimatedLink
      to={params2 ? `/${params1}/${params2}` : `/${params1}`}
      className="underline-link"
      onMouseEnter={() => {
        const underline = document.querySelector(".underline-link .underline");

        if (underline) {
          underline.classList.add("visible");
        }
      }}
      onMouseLeave={() => {
        const underline = document.querySelector(".underline-link .underline");

        if (underline) {
          underline.classList.remove("visible");
        }
      }}
    >
      <span>{text}</span>
      <motion.span
        className="underline"
        variants={underlineVariants}
        initial="hidden"
      />
    </AnimatedLink>
  );
}
