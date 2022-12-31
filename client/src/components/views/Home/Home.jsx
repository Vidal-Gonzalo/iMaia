import React, { useEffect, useState } from "react";
import { textServices } from "../../../api/textServices";
import Spinner from "../../Spinner/Spinner";
import Greeting from "./Greeting/Greeting";
import RecentTexts from "./RecentTexts/RecentTexts";
import { searchElements } from "../../../utils/searchElements";
import { tags } from "../../../assets/data/Tags";
import "./Home.css";
import FeaturedTexts from "./FeaturedTexts/FeaturedTexts";

export default function Home() {
  const [texts, setTexts] = useState([]);
  const [featuredTexts, setFeaturedTexts] = useState([]);

  let writingTags = searchElements.getRandomElements(tags[0].tag, 2);
  let poemTags = searchElements.getRandomElements(tags[1].tag, 2);

  useEffect(() => {
    const loadTexts = async () => {
      const response = await textServices.getTexts();
      if (response) {
        setTexts(response);
        setFeaturedTexts(searchElements.getMostLikedElements(response));
      }
    };

    document.title = "iMaia - Cuenta tu verdad";
    loadTexts();
  }, []);

  return (
    <section className="home-container">
      {texts ? (
        <>
          <Greeting texts={texts} />{" "}
          <FeaturedTexts
            title={"Textos destacados de esta semana"}
            texts={featuredTexts}
          />{" "}
          {/* Diary component */}
          <RecentTexts tags={writingTags} genre={"Escritos"} texts={texts} />
          <RecentTexts tags={poemTags} genre={"Poemas"} texts={texts} />
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
}
