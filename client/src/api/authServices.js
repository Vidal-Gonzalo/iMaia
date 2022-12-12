import axios from "axios";
const { REACT_APP_BACKEND_PORT } = process.env;

export const authServices = {
  login: async (email, password) => {
    let response = await axios.post(
      `http://localhost:${REACT_APP_BACKEND_PORT}/users/login`,
      {
        email,
        password,
      }
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },
  register: async (username, email, password) => {
    const response = await axios.post(
      `http://localhost:${REACT_APP_BACKEND_PORT}/users`,
      {
        username,
        email,
        password,
      }
    );

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },
  logout: () => {
    localStorage.removeItem("user");
  },
};
