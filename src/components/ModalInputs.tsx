import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import TTask from '../types/TypeTask';
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/modules/TasksSlice';


interface ModalInputsProps {
	title: string;
	description: string;
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}

const ModalInputs: React.FC<ModalInputsProps> = ({ title, description, openModal, actionCancel, actionConfirm }) => {
  const [descriptionTask, setDescriptionTask] = useState<string>('');
  const [titleTask, setTitleTask] = useState<string>('');
  const dispatch = useAppDispatch();
  
  const handleClose = () => {
    actionCancel();
  };

  const handleConfirm = () =>{
    const newTask: TTask = {
      id: Date.now(),
      title: titleTask,
      description: descriptionTask,
      favorite: false
    };

    dispatch(addTask(newTask));
    actionConfirm();
    setDescriptionTask('');
    setTitleTask('');
  };


  return (
    <Box>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
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
            onChange={ev => setTitleTask(ev.target.value)}
            value={titleTask}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="descriptionTask"
            label="Descrição do recado"
            type={'text'}
            fullWidth
            onChange={ev => setDescriptionTask(ev.target.value)}
            value={descriptionTask}
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
