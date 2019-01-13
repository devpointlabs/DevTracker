import axios from "axios";

const COMPANIES = "COMPANIES";
const ADD_COMPANY = "ADD_COMPANY";

// REDUX ACTIONS

export const getCompanies = () => {
  return dispatch => {
    axios
      .get("/api/companies")
      .then(res => dispatch({ type: COMPANIES, companies: res.data }))
      .catch(err => console.log(err));
  };
};

export const addCompany = (id, name, zip, state, city, website_url) => {
  return dispatch => {
    let company = { id, name, zip, state, city, website_url };
    axios
      .post("/api/companies", { company })
      .then(res => dispatch({ type: ADD_COMPANY, company: res.data }))
      .catch(err => console.log(err));
  };
};

// REDUX REDUCER

export default (state = [], action) => {
  switch (action.type) {
    case COMPANIES:
      return action.companies;
    case ADD_COMPANY:
      return [action.company, ...state];
    // case UPDATE_APP:
    //   return state.map( a => {
    //     if (a.id === action.app.id)
    //       return action.app
    //      return a
    //   })
    // case DELETE_APP:
    //   return state.filter( a => a.id !== action.id )
    default:
      return state;
  }
};

// const UPDATE_APP = 'UPDATE_APP';
// const DELETE_APP = 'DELETE_APP';

// export const updateApp = (app) => {
//   return (dispatch) => {
//     axios.put(`/api/apps/${app.id}`, { app } )
//       .then( res => dispatch({ type: UPDATE_APP, app: res.data }) )
//   }
// }

// export const deleteApp = (id) => {
//   return (dispatch) => {
//     axios.delete(`/api/apps/${id}`)
//       .then( () => dispatch({ type: DELETE_APP, id }) )
//   }
// }

//     case UPDATE_APP:
//       return state.map( a => {
//         if (a.id === action.app.id)
//           return action.app
//          return a
//       })
//     case DELETE_APP:
//       return state.filter( a => a.id !== action.id )
//     default:
//       return state;
//   }
// }
