import React, { useEffect, useState } from "react";
import { textServices } from "../../../../../api/textServices";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import TextsCarousel from "../RecentTexts/TextsCarousel/TextsCarousel";
import UnderlinedLink from "../../../../UnderlinedLink/UnderlinedLink";

export default function FollowingTexts() {
  const userFollowingsIds = useSelector((state) => state.auth.user.following);
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTextsByUserId = async (id) => {
      try {
        const response = await textServices.getTextsById(id);
        return response;
      } catch (e) {
        setError(true);
        console.error(e);
      }
    };

    // Creamos una variable auxiliar para almacenar los usuarios seguidos
    let textsData = [];

    const fetchData = async () => {
      setLoading(true);
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
      setLoading(false);
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
      {loading && <CircularProgress />}

      {texts.length > 0 &&
        texts.map((userTexts, index) => {
          console.log(userTexts);
          const author = userTexts[0].author;
          const title = (
            <p>
              Textos recientes de{" "}
              <UnderlinedLink params1={"user"} params2={author} text={author} />
            </p>
          );
          return <TextsCarousel title={title} texts={userTexts} key={index} />;
        })}

      {error && <p>Ha habido un error</p>}
    </div>
  );
}
