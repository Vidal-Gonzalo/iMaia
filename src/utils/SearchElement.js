export const SearchElement = {
  getElementId: (array, title) => {
    const thisElement = array.filter((e) => e.title === title);
    return thisElement[0].id;
  },
  getElementTags: (id, tags) => {
    const thisTags = tags.find((t) => t.categoryId === id);
    if (thisTags !== undefined) return thisTags.tag;
    else return null;
  },
};
