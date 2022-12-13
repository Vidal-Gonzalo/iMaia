import axios from "axios";
const { REACT_APP_BACKEND_PORT } = process.env;

export const searchServices = {
  getElementsByName: async (type, name) => {
    try {
      if (type === "undefined" || name === "undefined") return null;
      const response = await axios.get(
        `http://localhost:${REACT_APP_BACKEND_PORT}/search/${type}/${name}`
      );
      return response.data;
    } catch (e) {
      return e.message;
    }
  },
};
