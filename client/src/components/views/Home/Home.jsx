import React, { useEffect } from "react";
import "./Home.css";
import Features from "./Features/Features";
import HomeTabs from "./HomeTabs/HomeTabs";

export default function Home() {
  useEffect(() => {
    document.title = "iMaia - Cuenta tu verdad";
  }, []);
  return (
    <section className="home-container">
      <Features />
      <HomeTabs />
    </section>
  );
}
