export const utilities = {
  limitString: (str, limit) => {
    if (str.length > limit)
      return { string: str.slice(0, limit).concat("...") };
    return { string: str };
  },
  checkIfIncludes: (a, b) => {
    let includes = false;
    for (let i = 0; i < b.length; i++) {
      if (a.includes(b[i])) {
        includes = true;
      } else {
        includes = false;
        break;
      }
    }
    return includes;
  },
  scrollTo: (ref) => {
    ref?.current?.scrollIntoView();
  },
  makeTextBold: (text, word) => {
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
  },
};
