export const utilities = {
  limitString: (str, limit) => {
    if (str.length > limit)
      return { string: str.slice(0, limit).concat("...") };
    return { string: str };
  },
};
