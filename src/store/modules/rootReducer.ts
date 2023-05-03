import { combineReducers } from '@reduxjs/toolkit';
import UsersSlice from './UsersSlice';
import UserLoggedSlice from './UserLoggedSlice';


export default combineReducers({
  users: UsersSlice,
  userLogged: UserLoggedSlice,
  
});