import axios from "axios";
import { comments } from "../assets/data/Comments";

export const searchServices = {
  getElementsByName: async (type, name) => {
    return await axios.get(`/search/${type}/${name}`);
  },
};
