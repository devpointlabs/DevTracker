import axios from 'axios';

const COMPANIES = 'COMPANIES';

// REDUX ACTIONS

export const getCompanies = () => {
    return (dispatch) => {
        axios.get('/api/companies')
        .then(res => dispatch({ type: COMPANIES, companies: res.data }))
    }
}

// REDUX REDUCER

export default (state = [], action ) => {
  switch(action.type) {
    case COMPANIES:
      return action.companies
    // case ADD_APP:
    //   return [action.app, ...state]
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
}

// const APPS = 'APPS';
// const ADD_APP = 'ADD_APP';
// const UPDATE_APP = 'UPDATE_APP';
// const DELETE_APP = 'DELETE_APP';

// // REDUX ACTIONS

// export const getApps = () => {
//   return (dispatch) => {
//     axios.get('/api/apps')
//       .then( res => dispatch({ type: APPS, apps: res.data }) )
//   }
// }

// export const addApp = (app) => {
//   return (dispatch) => {
//     axios.post('/api/apps', { app } )
//      .then( res => dispatch({ type: ADD_APP, app: res.data }) )
//   }
// }

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

// // REDUX REDUCER

// export default (state = [], action ) => {
//   switch(action.type) {
//     case APPS:
//       return action.apps
//     case ADD_APP:
//       return [action.app, ...state]
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