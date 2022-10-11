import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { comments } from "../assets/data/Comments";

export const iMaiaApi = {
  getTextsByGenre: async (genre) => {
    return await axios.get(`/texts/${genre}`);
  },
  getTextById: async (id) => {
    if (id !== undefined) {
      return await axios.get(`/text/${id}`);
    }
  },
  getUserById: async (id) => {
    return await axios.get(`/users/${id}`);
  },
  likeAPost: async (textId, userId) => {
    return await axios.post(`/like/${textId}/${userId}`);
  },
  saveAPost: async (textId, userId) => {
    return await axios.post(`/save/${textId}/${userId}`);
  },
  getComments: async (commentId) => {
    return await axios.get(`/comments/${commentId}`);
  },
  commentAPost: async (textId, userId, comment) => {
    return await axios.post(`/comment/${textId}`, {
      id: comments.length + 1,
      userId,
      comment,
    });
  },
};
