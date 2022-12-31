import React from "react";
import TextsCarousel from "./TextsCarousel/TextsCarousel";

export default function RecentTexts({ genre, tags, texts }) {
  return (
    <>
      {tags?.map((tag, index) => {
        return (
          <TextsCarousel key={index} genre={genre} tag={tag} texts={texts} />
        );
      })}
    </>
  );
}
