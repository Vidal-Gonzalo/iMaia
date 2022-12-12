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
};
