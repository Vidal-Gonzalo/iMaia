import React, { useEffect, useState } from "react";
import { textServices } from "../../../api/textServices";
import Spinner from "../../Spinner/Spinner";
import RecentTexts from "./RecentTexts/RecentTexts";
import { searchElements } from "../../../utils/searchElements";
import { tags } from "../../../assets/data/Tags";
import "./Home.css";
import Features from "./Features/Features";

export default function Home() {
  const [texts, setTexts] = useState([]);

  let writingTags = searchElements.getRandomElements(tags[0].tag, 2);
  let poemTags = searchElements.getRandomElements(tags[1].tag, 2);

  useEffect(() => {
    const loadTexts = async () => {
      const response = await textServices.getTexts();
      if (response) {
        setTexts(response);
      }
    };

    document.title = "iMaia - Cuenta tu verdad";
    loadTexts();
  }, []);

  return (
    <section className="home-container">
      {texts ? (
        <>
          <Features />
          <RecentTexts tags={writingTags} genre={"Escritos"} texts={texts} />
          {/* <div
            className="home-banner-container"
            style={{
              backgroundImage: `url(${leafs})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="home-banner">
              <h6>Comparte lo que llevas dentro</h6>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "var(--global-primary-color)",
                  fontFamily: "var(--global-primary-font)",
                  margin: "0 1rem 0 1rem",
                }}
                startIcon={<CreateIcon />}
              >
                Escribir
              </Button>
            </div>
          </div> */}
          <RecentTexts tags={poemTags} genre={"Poemas"} texts={texts} />
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
}
