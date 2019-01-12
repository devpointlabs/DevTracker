import axios from "axios";

const ADD_APPLICATION = "ADD_APPLICATION";

export const addApplication = (application) => {
  return dispatch => {
    axios
      .post(`/api/users/${application.user_id}/applications`, { application })
      .then(res => dispatch({ type: ADD_APPLICATION, application: res.data }))
      .catch(err => console.log(err));
  };
};

// REDUX REDUCER

export default (state = [], action) => {
  switch (action.type) {
    case ADD_APPLICATION:
      return [action.application, ...state];
    default:
      return state;
  }
};
