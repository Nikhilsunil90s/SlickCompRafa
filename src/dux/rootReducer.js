import { matchesAPI } from 'api/match';
import { userAPI } from 'api/user';
import { combineReducers } from 'redux';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  [matchesAPI.reducerPath]: matchesAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer
});
export default rootReducer;
