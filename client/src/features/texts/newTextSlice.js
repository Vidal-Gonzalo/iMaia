import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  overview: "",
  genre: "",
  tags: [],
  image: "",
  text: "",
};

export const newTextSlice = createSlice({
  name: "newText",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      const { title, overview, genre, tags } = action.payload;
      state.title = title;
      state.overview = overview;
      state.genre = genre;
      state.tags.push(tags);
    },
    setImage: (state, action) => {
      const { image } = action.payload;
      state.image = image;
    },
  },
});

export const { setDetails, setImage } = newTextSlice.actions;

export default newTextSlice.reducer;
