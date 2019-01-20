import { combineReducers, } from 'redux';
import companies from './companies';
import applications from './applications';
import contacts from './contacts'
import todos from './todos';
import calls from './calls';

const rootReducer = combineReducers({
    companies,
    applications,
    contacts,
    todos,
    calls
});

export default rootReducer;