import axios from "axios"

const ADD_CONTACT = "ADD_CONTACT";
const GET_CONTACTS = "GET_CONTACTS";
const DELETE_CONTACT = "DELETE_CONTACT"

export const getContacts = (user_id) => {
  return (dispatch) => {
    axios.get(`/api/users/${user_id}/contacts`)
      .then(res => {
        dispatch({ type: GET_CONTACTS, contacts: res.data })
      })
      .catch(err => console.log(err));
  };
};

export const addContact = (contact) => {
  return (dispatch) => {
    axios.post(`/api/users/${contact.user_id}/contacts`, { contact })
      .then(res => dispatch({ type: ADD_CONTACT, contact: res.data[0] }))
      .catch(err => console.log(err));
  };
};

export const deleteContact = (user_id, contact_id) => {
  return (dispatch) => {
    axios.delete(`/api/users/${user_id}/contacts/${contact_id}`)
      .then(() => dispatch({ type: DELETE_CONTACT, user_id, contact_id }))
  }
}

export const updateContact = (user, contact) => {
  return (dispatch) => {
    axios.update(`/api/users/${user.id}/contacts/${contact.id}`, contact)
      .then(res => dispatch({ type: UPDATE_CONTACT, contact: res.data }))
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return action.contacts;
    case ADD_CONTACT:
      return [action.contact, ...state];
    default:
      return state;
    case UPDATE_APP:
      return state.map(c => {
        if (c.id === action.contact.id)
          return action.contact
        return c
      })
    case DELETE_APP:
      return state.filter(c => c.id !== action.id)
    default:
      return state;
  }
};  