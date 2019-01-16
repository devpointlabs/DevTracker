import axios from "axios";

const ADD_APPLICATION = "ADD_APPLICATION";
const GET_APPLICATIONS = "GET_APPLICATIONS";

export const getApplications = (user_id) => {
  return dispatch => {
    axios.get(`/api/users/${user_id}/applications`)
    .then(res => {
      dispatch({ type: GET_APPLICATIONS, applications: res.data })
    })
    .catch(err => console.log(err));
  }
}

export const addApplication = (application) => {
  return dispatch => {
    axios
      .post(`/api/users/${application.user_id}/applications`, { application })
      .then(res => dispatch({ type: ADD_APPLICATION, application: res.data[0] }))
      .catch(err => console.log(err));
  };
};

// REDUX REDUCER

export default (state = [], action) => {
  switch (action.type) {
    case GET_APPLICATIONS:
      return action.applications;
    case ADD_APPLICATION:
      return [action.application, ...state];
    default:
      return state;
  }
};
