import axios from "axios"

const ADD_CONTACT  = "ADD_CONTACT";
const GET_CONTACTS = "GET_CONTACTS";

export const getContacts = (user_id) => {
  return dispatch => {
    axios.get(`/api/users/${user_id}/contacts`)
    .then(res => {
      dispatch({ type: GET_CONTACTS, contacts: res.data })
    })
    .catch(err => console.log(err));
  };
};

export const addContact = (contact) => {
  return dispatch => {
    axios.post(`/api/users/${contact.user_id}/contacts`, { contact })
    .then(res => dispatch({ type: ADD_CONTACT, contact: res.data[0] }))
    .catch(err => console.log(err));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return action.contacts;
    case ADD_CONTACT:
      return [action.contact, ...state];
    default:
      return state;
  }
};