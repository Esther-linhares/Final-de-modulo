import { combineReducers } from '@reduxjs/toolkit';
import UsersSlice from './UsersSlice';
import UserLoggedSlice from './UserLoggedSlice';
import TasksSlice from './TasksSlice';


export default combineReducers({
  users: UsersSlice,
  userLogged: UserLoggedSlice,
  tasks: TasksSlice
});