import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TUser from '../../types/TypeUser';

interface UserState {
    user: TUser
}

const initialState: UserState ={
  user: {email: '', password: '', tasks: []},
    
};

export const loggedUserSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    setuserLogged: (state, action: PayloadAction<TUser>) => {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.tasks.push(...action.payload.tasks);
    },
  }
});

export default loggedUserSlice.reducer;
export const {setuserLogged} = loggedUserSlice.actions;

