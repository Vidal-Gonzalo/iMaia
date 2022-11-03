export const SearchElements = {
  getElementIdByTitle: (array, title) => {
    const thisElement = array.find((e) => e.title === title);
    if (thisElement !== undefined) {
      return thisElement.id;
    } else {
      return null;
    }
  },
  getUserByUsername: (array, username) => {
    return array.find((e) => e.username === username);
  },
  getElementTags: (genre, tags) => {
    const thisTags = tags.find((t) => t.genre === genre);
    if (thisTags !== undefined) return thisTags.tag;
    else return null;
  },
  getMostLikedElements: (array) => {
    array = array.sort((a, b) => b.likes - a.likes);
    return [array[0], array[1], array[2], array[3], array[4]];
  },
  getElementById: (array, id) => {
    return array.find((e) => e.id === id);
  },
  filterElementsById: (array, id) => {
    return array.filter((e) => e.id === id);
  },
  filterElementsByGenre: (array, genre) => {
    return array.filter((e) => e.genre === genre);
  },
  filterElementsByCategory: (array, category) => {
    return array.filter((e) => e.category === category);
  },
  containsTitle: (array, title) => {
    let elements = [];
    for (let element of array) {
      if (element.title.toLowerCase().includes(title.toLowerCase())) {
        elements.push(element);
      }
    }
    return elements;
  },
  containsUsername: (array, username) => {
    let elements = [];
    for (let element of array) {
      if (element.username.toLowerCase().includes(username.toLowerCase())) {
        elements.push(element);
      }
    }
    return elements;
  },
};
