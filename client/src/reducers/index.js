import { combineReducers, } from 'redux';
import companies from './companies';
import applications from './applications';
import contacts from './contacts'
import todos from './todos';
import calls from './calls';
import interviews from './interviews';

const rootReducer = combineReducers({
    companies,
    applications,
    contacts,
    todos,
    calls,
    interviews
});

export default rootReducer;