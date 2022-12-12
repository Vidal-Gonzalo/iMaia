import axios from "axios";
const { REACT_APP_BACKEND_PORT } = process.env;

export const interactionServices = {
  getComments: async (textId) => {
    try {
      const response = await axios.get(
        `http://localhost:${REACT_APP_BACKEND_PORT}/interactions/comments/${textId}`
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.error(e);
    }
  },
  interactionWithPost: async (textId, interaction) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (user) {
        const response = await axios.post(
          `http://localhost:${REACT_APP_BACKEND_PORT}/interactions/`,
          {
            textId,
            interaction,
          },
          config
        );
        return response.data;
      }
    } catch (e) {
      console.error(e);
    }
  },
  commentAPost: async (textId, comment) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (user) {
        const response = await axios.post(
          `http://localhost:${REACT_APP_BACKEND_PORT}/interactions/comment`,
          {
            textId,
            comment,
          },
          config
        );
        return response.data;
      }
    } catch (e) {
      console.error(e);
    }
  },
  followUser: async (userId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (user) {
        const response = await axios.post(
          `http://localhost:${REACT_APP_BACKEND_PORT}/interactions/follow/user`,
          {
            userId,
          },
          config
        );
        return response.data;
      }
    } catch (e) {
      console.error(e);
    }
  },
};
