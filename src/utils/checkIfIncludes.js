export const checkIfIncludes = (a, b) => {
  let includes = false;
  for (let i = 0; i < b.length; i++) {
    console.log(a);
    if (a.includes(b[i])) {
      includes = true;
    } else {
      includes = false;
      break;
    }
  }
  return includes;
};
