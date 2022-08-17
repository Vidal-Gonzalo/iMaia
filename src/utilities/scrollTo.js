export const scrollTo = (ref) => {
  window.scroll({
    top: ref.current.offsetTop,
    behavior: "smooth",
  });
};
