import axios from "axios";
import { comments } from "../assets/data/Comments";

export const iMaiaApi = {
  getTextsByGenre: async (genre) => {
    return await axios.get(`http://localhost:8000/texts/${genre}`);
  },
  getTextById: async (id) => {
    if (id !== undefined) {
      return await axios.get(`http://localhost:8000/texts/id/${id}`);
    }
  },
  getTextsByUsername: async (username) => {
    if (username !== undefined) {
      return await axios.get(`/text/profile/${username}`);
    }
  },
  getUserSavedTexts: async (username) => {
    if (username !== undefined) {
      return await axios.get(`/text/profile/savedTexts/${username}`);
    }
  },
  getUserByUsername: async (username) => {
    return await axios.get(`http://localhost:8000/users/user/${username}`);
  },
  getUserById: async (id) => {
    return await axios.get(`http://localhost:8000/users/${id}`);
  },
  getSubscriptionsById: async (id, subscriptionType) => {
    return await axios.get(`/users/${subscriptionType}/${id}`);
  },
  getElementsByName: async (type, name) => {
    return await axios.get(`/search/${type}/${name}`);
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
  followUser: async (userIdWhoFollows, userIdFollowed) => {
    return await axios.post(
      `/user/follow/${userIdWhoFollows}/${userIdFollowed}`
    );
  },
  login: async (email, password) => {
    let response = await axios.post(`http://localhost:8000/users/login`, {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },
  register: async (username, email, password) => {
    const response = await axios.post(`http://localhost:8000/users`, {
      username,
      email,
      password,
    });

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },
  logout: () => {
    localStorage.removeItem("user");
  },
};
