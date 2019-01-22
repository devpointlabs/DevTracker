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

export const addCompany = (id, name, website_url, callback) => {
  return dispatch => {
    let company = { id, name, website_url };
    axios
      .post("/api/companies", { company })
      .then(res => {
        dispatch({ type: ADD_COMPANY, company: res.data })
        callback(res.data.id);
      })
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
    default:
      return state;
  }
};
