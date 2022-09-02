export const makeTextBold = (text, word) => {
  const textArray = text.split(word);
  return (
    <p>
      {textArray.map((item, index) => (
        <span key={index}>
          {item}
          {index !== textArray.length - 1 && <b>{word}</b>}
        </span>
      ))}
    </p>
  );
};
