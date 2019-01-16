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
        .then( res => {
            dispatch({type: TOGGLE_COMPLETE, todo: res.data})
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
    switch(action.type) {
        case GET_TODOS:
            return action.todos;
        case ADD_TODO:
            return [action.todo, ...state];
        case TOGGLE_COMPLETE:
            return state.map(todo => {
                if(todo.id === action.todo.id)
                    return action.todo
                return todo
            })
        case DELETE_TODO:
            return state.filter(t => t.id !== action.id);
        default:
            return state;
    }
}


// export default (state = [], action) => {
//   switch (action.type) {
//     case GET_APPLICATIONS:
//       return action.applications;
//     case ADD_APPLICATION:
//       return [action.application, ...state];
//     default:
//       return state;
//   }
// };


// const ADD_APPLICATION = "ADD_APPLICATION";
// const GET_APPLICATIONS = "GET_APPLICATIONS";

// export const getApplications = (user_id) => {
//   return dispatch => {
//     axios.get(`/api/users/${user_id}/applications`)
//     .then(res => {
//       dispatch({ type: GET_APPLICATIONS, applications: res.data })
//     })
//     .catch(err => console.log(err));
//   }
// }

// export const addApplication = (application) => {
//   return dispatch => {
//     axios
//       .post(`/api/users/${application.user_id}/applications`, { application })
//       .then(res => dispatch({ type: ADD_APPLICATION, application: res.data[0] }))
//       .catch(err => console.log(err));
//   };
// };

// // REDUX REDUCER

