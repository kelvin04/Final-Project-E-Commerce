import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
    auth: AuthReducer,
    searchResult: SearchReducer,
    badge: NotificationReducer
});