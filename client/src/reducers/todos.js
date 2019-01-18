import axios from "axios";

const GET_TODOS = "GET_TODOS";
const ADD_TODO = "ADD_TODO";
const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
const DELETE_TODO = "DELETE_TODO";

export const deleteTodo = (user, id) => {
    return dispatch => {
        axios.delete(`/api/users/${user.id}/todos/${id}`)
            .then(res => dispatch({ type: DELETE_TODO, id }))
    }
}

export const toggleComplete = (user, todo) => {
    return dispatch => {
        axios.put(`/api/users/${user.id}/todos/${todo.id}`, todo)
            .then(res => {
                dispatch({ type: TOGGLE_COMPLETE, todo: res.data })
            })
    }
}

export const getTodos = (user_id) => {
    return dispatch => {
        axios.get(`/api/users/${user_id}/todos`)
            .then(res => {
                dispatch({ type: GET_TODOS, todos: res.data })
            })
            .catch(err => console.log(err));
    }
}

export const addTodo = (user_id, task) => {
    return dispatch => {
        axios.post(`/api/users/${user_id}/todos`, task)
            .then(res => {
                dispatch({ type: ADD_TODO, todo: res.data })
            })
            .catch(err => console.log(err));
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case GET_TODOS:
            return action.todos;
        case ADD_TODO:
            return [action.todo, ...state];
        case TOGGLE_COMPLETE:
            return state.map(todo => {
                if (todo.id === action.todo.id)
                    return action.todo
                return todo
            })
        case DELETE_TODO:
            return state.filter(t => t.id !== action.id);
        default:
            return state;
    }
}




