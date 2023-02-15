export const searchElements = {
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
  getUserByEmail: (array, email) => {
    return array.find((e) => e.email === email);
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
  filterElementsByTag: (section, array, tag) => {
    let elements = [];
    array = searchElements.getRandomElements(array, 50);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].tags.length; j++) {
        if (array[i].tags[j] === tag && array[i].genre === section) {
          elements.push(array[i]);
        }
      }
    }
    return elements;
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
  getRandomElements: (elements, numberOfElements) => {
    return [...elements]
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, numberOfElements);
  },
};
