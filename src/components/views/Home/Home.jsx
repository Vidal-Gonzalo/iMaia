import React, { lazy, Suspense, useEffect } from "react";
import Banner from "../../Banner/Banner.jsx";
import MostValuedWritings from "../../MostValuedWritings/MostValuedWritings.jsx";
import Objectives from "./Objectives/Objectives.jsx";
import Presentation from "./Presentation/Presentation";

const TextsList = lazy(() => import("../../TextsList/TextsList.jsx"));

export default function Home() {
  useEffect(() => {
    document.title = "iMaia - Cuenta tu historia";
  }, []);

  return (
    <main className="main">
      <Presentation
        title={"iMaia"}
        subtitle={"La vida está compuesta de perspectivas, contanos la tuya."}
      />
      <Objectives
        title={"Nuestra misión"}
        subtitle={
          "Crear un espacio donde podrás compartir tus escritos y conectar con una comunidad única de escritores y lectores"
        }
      />
      <MostValuedWritings title={"Escritos más valorados del mes"} />
      <Banner title={"¿Qué esperas para formar parte de nuestra comunidad?"} />
      <MostValuedWritings title={"Poemas más valorados del mes"} />
      <Suspense fallback={<div>Cargando...</div>}>
        <TextsList />
      </Suspense>
    </main>
  );
}
