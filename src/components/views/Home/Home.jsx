import React from "react";
import Banner from "../../Banner/Banner.jsx";
import MostValuedWritings from "../../MostValuedWritings/MostValuedWritings.jsx";
import Objectives from "./Objectives/Objectives.jsx";
import Presentation from "./Presentation/Presentation";

export default function Home() {
  return (
    <main className="main">
      <Presentation
        title={"iMaia"}
        subtitle={"La vida está compuesta de perspectivas, contanos la tuya."}
      />
      <Objectives
        title={"Nuestro objetivo"}
        subtitle={
          "es ofrecerte un espacio donde podrás compartir tu manera de sentir la vida y conectar tanto con escritores como con lectores que transitaron el mismo camino"
        }
      />
      <Banner title={"¿Qué esperas para formar parte de nuestra comunidad?"} />
      <MostValuedWritings title={"Escritos mas valorados del mes"} />
      <MostValuedWritings title={"Poemas mas valorados del mes"} />
    </main>
  );
}
