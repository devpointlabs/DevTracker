import axios from "axios";

const GET_INTERVIEWS = "GET_INTERVIEWS";
const ADD_INTERVIEW = "ADD_INTERVIEW";
const DELETE_INTERVIEW = "DELETE_INTERVIEW";
// const UPDATE_INTERVIEW = "UPDATE_INTERVIEW";

export const getInterviews = (id) => {
    return dispatch => {
        axios.get(`/api/applications/${id}/interviews`)
        .then(res => dispatch({type: GET_INTERVIEWS, interviews: res.data }))
    }
}

export const addInterview = (interview, application_id) => {
    return dispatch => {
        axios.post(`/api/applications/${application_id}/interviews`, { interview } )
        .then(res => dispatch({ type: ADD_INTERVIEW, interview: res.data }))
    }
}

export const deleteInterview = (application_id, id) => {
    return dispatch => {
        axios.delete(`/api/applications/${application_id}/interviews/${id}`)
        .then(res => dispatch({ type: DELETE_INTERVIEW, id }))
    }
}


export default (state = [], action) => {
    switch (action.type) {
        case GET_INTERVIEWS:
            return action.interviews;
        case ADD_INTERVIEW:
            return [action.interview, ...state];
        case DELETE_INTERVIEW:
            return state.filter(c => c.id !== action.id)
        default:
            return state;
    }
}