import axios from "axios";

const ADD_APPLICATION = "ADD_APPLICATION";
const GET_APPLICATIONS = "GET_APPLICATIONS";
const GET_APPLICATION = "GET_APPLICATION";
const UPDATE_APPLICATION = "UPDATE_APPLICATION";
const DELETE_APPLICATION = "DELETE_APPLICATION";
const UPDATE_TIME = "UPDATE_TIME";

export const getApplications = (user_id, callback) => {
   return dispatch => {
      axios
         .get(`/api/users/${user_id}/applications`)
         .then(res => {
            // console.log(res.data);
            dispatch({ type: GET_APPLICATIONS, applications: res.data });
         })
         .then(callback)
         .catch(err => console.log(err));
   };
};

export const updateTime = (user, id) => {
   let currentTime = new Date();
   return dispatch => {
      axios
         .put(`/api/users/${user.id}/applications/${id}`, {
            updated_at: currentTime
         })
         .then(res => {
            // console.log(res.data);
            dispatch({ type: UPDATE_TIME, application: res.data });
         });
   };
};

export const getApplication = (user, id, callback) => {
   return dispatch => {
      axios
         .get(`/api/users/${user.id}/applications/${id}`)
         .then(res => {
            // console.log(res.data);
            dispatch({ type: GET_APPLICATION, application: res.data });
         })
         .then(callback);
   };
};

export const addApplication = (application, user_id, callback) => {
   return dispatch => {
      axios
         .post(`/api/users/${user_id}/applications`, { application })
         .then(res => {
            return dispatch({
               type: ADD_APPLICATION,
               application: res.data[0]
            });
         })
         .then(callback)
         .catch(err => console.log(err));
   };
};

export const updateApplication = (application, user, id) => {
   return dispatch => {
      axios
         .put(`/api/users/${user.id}/applications/${id}`, { application })
         .then(res => {
            dispatch({ type: UPDATE_APPLICATION, application: res.data });
         });
   };
};

export const deleteApplication = (user, id, callback) => {
   return dispatch => {
      axios
         .delete(`/api/users/${user.id}/applications/${id}`)
         .then(res => dispatch({ type: DELETE_APPLICATION, id }))
         .then(callback);
   };
};

// REDUX REDUCER

export default (state = [], action) => {
   switch (action.type) {
      case GET_APPLICATIONS:
         return action.applications;
      case ADD_APPLICATION:
         return [action.application, ...state];
      case GET_APPLICATION:
         return action.application;
      case UPDATE_APPLICATION:
         return state.map(a => {
            if (a.id === action.application.id) {
               return action.application;
            } else return a;
         });
      case UPDATE_TIME:
         return state.map(a => {
            if (a.id === action.application.id) {
               return action.application;
            } else return a;
         });
      case DELETE_APPLICATION:
         return state.filter(a => a.id !== action.id);
      default:
         return state;
   }
};
