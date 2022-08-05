const initialState = {
  posts: [
    {
      id: 1,
      title: "Landing Page",
      date: "09/09/2020 10:30 am",
      assigned: "Ignacio Truffa",
      userImage: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
      description: "Lorem ipsum dolor sit amet, consectetur",
      manager: "Ignacio Truffa",
      status: "Enabled",
    },
    {
      id: 2,
      title: "E-commerce shop",
      date: "09/09/2020 10:30 am",
      assigned: "Ignacio Truffa",
      userImage: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
      description: "Lorem ipsum dolor sit amet, consectetur",
      manager: "Ignacio Truffa",
      status: "Enabled",
    },
    {
      id: 3,
      title: "CRM Linkroom",
      date: "09/09/2020 10:30 am",
      assigned: "Ignacio Truffa",
      userImage: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
      description: "Lorem ipsum dolor sit amet, consectetur",
      manager: "Ignacio Truffa",
      status: "Enabled",
    },
  ],
  users: [
    {
      id: 1,
      name: "Ignacio Truffa",
      image: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
    },
    {
      id: 2,
      name: "Walt Cosani",
      image: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    },
  ],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // case PROJECT_ADD:
    //   return {
    //     loading: false,
    //     error: "",
    //     projects: [...projects, action.payload],
    //     users: users,
    //   };

    default:
      return state;
  }
};
