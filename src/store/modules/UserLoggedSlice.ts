import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TUser from '../../types/TypeUser';
import TTask from '../../types/TypeTask';


interface userloggedstate {
    userLogged: TUser;
}
const initialState: userloggedstate = {
  userLogged: { email: '', password: '', tasks: [] }
};
export const usuarioLogadoSlice = createSlice({
  name: 'usuarioLogado',
  initialState,
  reducers: {
    setUserLogged: (state, action: PayloadAction<TUser>) => {
      return { userLogged: action.payload };
    },

    logout: () => {
      return initialState;
    },
    addNewTask: (state, action: PayloadAction<TTask>) => {
      state.userLogged.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<TTask>) => {
      const task = action.payload;
      const index = state.userLogged.tasks.findIndex(item => item.id === task.id);

      state.userLogged.tasks[index] = task;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.userLogged.tasks.findIndex(item => item.id === id);

      state.userLogged.tasks.splice(index, 1);
    }
  }
});

export default usuarioLogadoSlice.reducer;

export const { setUserLogged, logout, addNewTask, updateTask, deleteTask } = usuarioLogadoSlice.actions;