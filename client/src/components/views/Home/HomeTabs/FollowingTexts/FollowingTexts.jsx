import React, { useEffect, useState } from "react";
import { textServices } from "../../../../../api/textServices";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import TextsCarousel from "../RecentTexts/TextsCarousel/TextsCarousel";
import { Link } from "react-router-dom";
import UnderlinedLink from "../../../../UnderlinedLink/UnderlinedLink";

export default function FollowingTexts() {
  const userFollowingsIds = useSelector((state) => state.auth.user.following);
  const [texts, setTexts] = useState();

  useEffect(() => {
    const getTextsByUserId = async (id) => {
      const response = await textServices.getTextsById(id);
      return response;
    };

    // Creamos una variable auxiliar para almacenar los usuarios seguidos
    let textsData = [];

    const fetchData = async () => {
      for (let i = 0; i < userFollowingsIds.length; i++) {
        const response = await getTextsByUserId(userFollowingsIds[i]);
        if (response) {
          // Verificamos si el usuario ya existe en la variable auxiliar antes de agregarlo
          if (!textsData.find((text) => text._id === response._id)) {
            textsData.push(response);
          }
        }
      }

      // Actualizamos el estado solo con los nuevos usuarios
      setTexts(textsData);
    };

    fetchData();
  }, [userFollowingsIds]);

  return (
    <div
      className="following-texts"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {texts ? (
        texts.map((userTexts, index) => {
          const author = userTexts[0].author;
          const title = (
            <p>
              Textos recientes de{" "}
              <UnderlinedLink params1={"user"} params2={author} text={author} />
            </p>
          );
          return <TextsCarousel title={title} texts={userTexts} key={index} />;
        })
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
