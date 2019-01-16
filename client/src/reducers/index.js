import { combineReducers, } from 'redux';
import companies from './companies';
import applications from './applications';
import contacts from './contacts'

const rootReducer = combineReducers({
    companies,
    applications,
    contacts
});

export default rootReducer;