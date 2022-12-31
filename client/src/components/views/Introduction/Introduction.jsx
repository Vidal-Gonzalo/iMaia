import React, { useEffect, useState, useRef } from "react";
import Banner from "./Banner/Banner.jsx";
import MostValuedWritings from "./MostValuedWritings/MostValuedWritings.jsx";
import Reasons from "../../Reasons/Reasons.jsx";
import Functionality from "./Functionality/Functionality.jsx";
import Presentation from "./Presentation/Presentation";
import { useNavigate } from "react-router-dom";
import { searchElements } from "../../../utils/searchElements.js";
import { utilities } from "../../../utils/utilities.js";
import { textServices } from "../../../api/textServices";
import { useSelector } from "react-redux";

export default function Introduction() {
  const navigate = useNavigate();
  const section = useRef(null);
  const [mostValuedWritings, setMostValuedWritings] = useState([]);
  const [mostValuedPoems, setMostValuedPoems] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const loadTextsData = async () => {
      const response = await textServices.getTexts();
      if (response) {
        //Get poems and writings
        let poems = response.filter((element) => element.genre === "poems");
        let writings = response.filter(
          (element) => element.genre === "writings"
        );
        //Then, get the most liked elements of each genre
        setMostValuedPoems(searchElements.getMostLikedElements(poems));
        setMostValuedWritings(searchElements.getMostLikedElements(writings));
      }
    };
    document.title = "iMaia - Cuenta tu verdad";
    if (user) {
      navigate("/home");
    }
    loadTextsData();
    utilities.scrollTo(section);
  }, [user, navigate]);

  return (
    <main className="main">
      <Presentation
        section={section}
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
        writings={mostValuedWritings}
      />
      <Reasons title={"¿Por qué usar iMaia?"} />
      <MostValuedWritings
        title={"Poemas mejor valorados por nuestra comunidad"}
        writings={mostValuedPoems}
      />
      {/* <Suspense fallback={<div>Cargando...</div>}>
        <TextsList />
      </Suspense> */}
    </main>
  );
}
