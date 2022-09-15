export const SearchElement = {
  getElementId: (array, title) => {
    const thisElement = array.filter((e) => e.title === title);
    if (thisElement.length > 0) {
      return thisElement[0].id;
    } else {
      return null;
    }
  },
  getElementTags: (id, tags) => {
    const thisTags = tags.find((t) => t.categoryId === id);
    if (thisTags !== undefined) return thisTags.tag;
    else return null;
  },
};
