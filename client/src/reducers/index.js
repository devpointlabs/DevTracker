import { combineReducers, } from 'redux';
import companies from './companies';
import applications from './applications';
import todos from './todos';

const rootReducer = combineReducers({
    companies,
    applications,
    todos
});

export default rootReducer;