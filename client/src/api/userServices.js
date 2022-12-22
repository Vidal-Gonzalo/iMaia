import axios from "axios";
const { REACT_APP_BACKEND_PORT } = process.env;

export const userServices = {
  getUserByUsername: async (username) => {
    if (username === "undefined") return null;
    const response = await axios.get(
      `http://localhost:${REACT_APP_BACKEND_PORT}/users/user/${username}`
    );
    return response.data;
  },
  getUserById: async (id) => {
    if (id === "undefined") return null;
    const response = await axios.get(
      `http://localhost:${REACT_APP_BACKEND_PORT}/users/${id}`
    );
    return response.data;
  },
  getSubscriptionsById: async (id, subscriptionType) => {
    if (id === "undefined" || subscriptionType === "undefined") return null;
    const response = await axios.get(
      `http://localhost:${REACT_APP_BACKEND_PORT}/users/${subscriptionType}/user/${id}`
    );
    return response.data;
  },
  updateData: async (email, username, biography, phrase) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let config = { headers: { Authorization: `Bearer ${user.token}` } };
    if (user) {
      const response = await axios.put(
        `http://localhost:${REACT_APP_BACKEND_PORT}/users`,
        {
          email,
          username,
          biography,
          phrase,
        },
        config
      );
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }
  },
  updatePassword: async (password, newPassword) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let config = { headers: { Authorization: `Bearer ${user.token}` } };
    if (user) {
      const response = await axios.put(
        `http://localhost:${REACT_APP_BACKEND_PORT}/users/password`,
        {
          password,
          newPassword,
        },
        config
      );
      return response.data;
    }
  },
};
