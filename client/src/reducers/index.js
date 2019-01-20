import { combineReducers, } from 'redux';
import companies from './companies';
import applications from './applications';
import contacts from './contacts'
import todos from './todos';

const rootReducer = combineReducers({
    companies,
    applications,
    contacts,
    todos
});

export default rootReducer;