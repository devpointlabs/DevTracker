import axios from "axios";

const GET_OFFERS = "GET_offers";
const ADD_OFFER = "ADD_OFFER";
const DELETE_OFFER = "DELETE_OFFER";
// const UPDATE_OFFER = "UPDATE_OFFER";

export const getOffers = (id) => {
    return dispatch => {
        axios.get(`/api/applications/${id}/offers`)
        .then(res => dispatch({type: GET_OFFERS, offers: res.data }))
    }
}

export const addOffer = (offer, application_id) => {
    return dispatch => {
        axios.post(`/api/applications/${application_id}/offers`, { offer } )
        .then(res => dispatch({ type: ADD_OFFER, offer: res.data }))
    }
}

export const deleteOffer = (application_id, id) => {
    return dispatch => {
        axios.delete(`/api/applications/${application_id}/offers/${id}`)
        .then(res => dispatch({ type: DELETE_OFFER, id }))
    }
}


export default (state = [], action) => {
    switch (action.type) {
        case GET_OFFERS:
            return action.offers;
        case ADD_OFFER:
            return [action.offer, ...state];
        case DELETE_OFFER:
            return state.filter(c => c.id !== action.id)
        default:
            return state;
    }
}