import axios from "axios";
const { REACT_APP_BACKEND_PORT } = process.env;

export const textServices = {
  getTextsByGenre: async (genre) => {
    try {
      if (genre === "undefined") return null;
      const response = await axios.get(
        `http://localhost:${REACT_APP_BACKEND_PORT}/texts/${genre}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  getTextById: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:${REACT_APP_BACKEND_PORT}/texts/id/${id}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  getTextsById: async (id) => {
    try {
      if (id === "undefined") return null;
      const response = await axios.get(
        `http://localhost:${REACT_APP_BACKEND_PORT}/texts/profile/username/${id}`
      );

      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  getUserSavedTexts: async (username) => {
    try {
      if (username === "undefined") return null;
      const response = await axios.get(
        `http://localhost:${REACT_APP_BACKEND_PORT}/texts/profile/savedTexts/username/${username}`
      );

      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
};
