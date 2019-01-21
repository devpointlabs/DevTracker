import axios from "axios";

const GET_NOTES = "GET_NOTES";
const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
// const UPDATE_INTERVIEW = "UPDATE_INTERVIEW";

export const getNotes = (id) => {
    return dispatch => {
        axios.get(`/api/applications/${id}/notes`)
        .then(res => dispatch({type: GET_NOTES, notes: res.data }))
    }
}

export const addNote = (note, application_id) => {
    return dispatch => {
        axios.post(`/api/applications/${application_id}/notes`, { note } )
        .then(res => dispatch({ type: ADD_NOTE, note: res.data }))
    }
}

export const deleteNote = (application_id, id) => {
    return dispatch => {
        axios.delete(`/api/applications/${application_id}/notes/${id}`)
        .then(res => dispatch({ type: DELETE_NOTE, id }))
    }
}


export default (state = [], action) => {
    switch (action.type) {
        case GET_NOTES:
            return action.notes;
        case ADD_NOTE:
            return [action.note, ...state];
        case DELETE_NOTE:
            return state.filter(c => c.id !== action.id)
        default:
            return state;
    }
}