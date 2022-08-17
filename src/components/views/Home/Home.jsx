import React, { useEffect } from "react";
import About from "../../About/About.jsx";
import Banner from "../../Banner/Banner.jsx";
import MostValuedWritings from "../../MostValuedWritings/MostValuedWritings.jsx";
import Reasons from "../../Reasons/Reasons.jsx";
import Functionality from "./Functionality/Functionality.jsx";
import Objectives from "./Objectives/Objectives.jsx";
import Presentation from "./Presentation/Presentation";

//const TextsList = lazy(() => import("../../TextsList/TextsList.jsx"));

export default function Home() {
  useEffect(() => {
    document.title = "iMaia - Cuenta tu verdad";
  }, []);

  return (
    <main className="main">
      <Presentation
        title={"iMaia"}
        subtitle={"La vida está compuesta de perspectivas, contanos la tuya."}
      />
      <Functionality title={"¿Cómo funciona?"} />
      <Banner
        title={"SOBRE NOSOTROS"}
        description={
          "Creamos esta plataforma con el propósito de darle el lugar necesario a los escritores para que puedan expresarse libremente, al mismo tiempo que se sumergen en una comunidad que comparte su misma pasión: escribir."
        }
      />
      <MostValuedWritings
        title={"Escritos mejor valorados por nuestra comunidad"}
      />
      <Reasons title={"¿Por qué usar iMaia?"} />
      <MostValuedWritings
        title={"Poemas mejor valorados por nuestra comunidad"}
      />
      {/* <Suspense fallback={<div>Cargando...</div>}>
        <TextsList />
      </Suspense> */}
    </main>
  );
}
