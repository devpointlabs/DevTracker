import { combineReducers, } from 'redux';
import companies from './companies';
import applications from './applications';

const rootReducer = combineReducers({
    companies,
    applications
});

export default rootReducer;