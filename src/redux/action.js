export const postDataAction = (posts) => {
  return {
    type: "SET_POSTS",
    payload: posts
  };
};

export const commentDataAction = (comments) => {
  return {
    type: "SET_COMMENTS",
    payload: comments
  };
};
