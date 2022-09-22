import axios from "axios";

export const iMaiaApi = {
  getTextsByGenre: async (genre) => {
    return await axios.get(`/texts/${genre}`);
  },
  getTextById: async (id) => {
    return await axios.get(`/text/${id}`);
  },
  getUserById: async (id) => {
    return await axios.get(`/users/${id}`);
  },
  likeAPost: async (textId, userId) => {
    await axios.post(`/like/${textId}/${userId}`);
  },
};
