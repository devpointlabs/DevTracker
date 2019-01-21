import axios from "axios";

const GET_CALLS = "GET_CALLS";
const ADD_CALL = "ADD_CALL";
const DELETE_CALL = "DELETE_CALL";
// const UPDATE_CALL = "UPDATE_CALL";

export const getCalls = (id) => {
    return dispatch => {
        axios.get(`/api/applications/${id}/calls`)
        .then(res => dispatch({type: GET_CALLS, calls: res.data }))
    }
}

export const addCall = (call, application_id) => {
    return dispatch => {
        axios.post(`/api/applications/${application_id}/calls`, { call } )
        .then(res => dispatch({ type: ADD_CALL, call: res.data }))
    }
}

export const deleteCall = (application_id, call_id) => {
    return dispatch => {
        axios.delete(`/api/applications/${application_id}/calls/${call_id}`)
        .then(res => dispatch({ type: DELETE_CALL, call_id }))
    }
}


export default (state = [], action) => {
    switch (action.type) {
        case GET_CALLS:
            return action.calls;
        case ADD_CALL:
            return [action.call, ...state];
        case DELETE_CALL:
            return state.filter(c => c.id !== action.call_id)
        default:
            return state;
    }
}
