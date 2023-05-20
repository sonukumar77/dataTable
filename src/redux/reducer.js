const INITIAL_STATE = {
  posts: [],
  comments: []
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "SET_COMMENTS":
      return { ...state, comments: action.payload };
    default: {
      return state;
    }
  }
};

export default dataReducer;
