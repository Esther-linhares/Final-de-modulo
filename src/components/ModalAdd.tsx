import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import TTask from '../types/TypeTask';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser } from '../store/modules/UsersSlice';
import { addNewTask } from '../store/modules/UserLoggedSlice';

interface ModalInputsProps {
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}

const ModalInputs: React.FC<ModalInputsProps> = ({ openModal, actionCancel, actionConfirm }) => {
  const dispatch = useAppDispatch();
  const[task, setTask] = React.useState({} as TTask);
  const userLogged = useAppSelector(state => state.userLogged.userLogged);


  useEffect(() =>{
    dispatch(updateUser({id: userLogged.email, changes: userLogged}));
  },[userLogged]);
  
  const handleClose = () => {
    actionCancel();
  };

  const handleChange = (ev: { target: { name: string; value: string } }) => {
    setTask(state => ({ ...state, [ev.target.name]: ev.target.value }));
  };

  const handleConfirm = () =>{
    dispatch(
      addNewTask({
        ...task,
        id: Date.now(),
        favorite: false
      })
    );
    actionConfirm();
  };

  return (
    <Box>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Adicionar</DialogTitle>
        <DialogContent>
          <DialogContentText>{'Adicione seu recado:'}</DialogContentText>
          <TextField
            sx={{
              '& label.Mui-focused': {
                color: '#222',
              },
              ' & .MuiInputBase-input': {
                '&.Mui-focused fieldset': {
                  borderColor: '#222',
                },
              },
            }}
            autoFocus
            margin="dense"
            id="titleTask"
            label="Titulo do recado"
            type={'text'}
            fullWidth
            name='title'
            onChange={handleChange}
            value={task.title}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="descriptionTask"
            label="Descrição do recado"
            type={'text'}
            fullWidth
            name="description"
            onChange={handleChange}
            value={task.description}
            variant="standard"
            sx={{ hover: 'false' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#222' }}>
                            Cancelar
          </Button>
          <Button onClick={handleConfirm} sx={{ color: '#222' }}>
                            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModalInputs;
