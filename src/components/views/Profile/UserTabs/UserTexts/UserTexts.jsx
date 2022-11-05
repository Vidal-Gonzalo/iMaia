import React, { useEffect } from "react";
import WritingCard from "../../../../WritingCard/WritingCard";
import "./UserTexts.css";

export default function UserWritings({ texts, type }) {
  useEffect(() => {}, [texts]);
  return (
    <div className="user-writings-container">
      {texts.length > 0 ? (
        <>
          <h5>Mis {type}</h5>
          <div className="user-writings-list">
            <>
              {texts?.map((text, index) => (
                <WritingCard element={text} key={index} />
              ))}
            </>
          </div>
        </>
      ) : (
        <p>No se han encontrado {type} :(</p>
      )}
    </div>
  );
}
