import React, { useState, useCallback, useEffect } from 'react';
import { Grid,Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ModalInputs from '../components/ModalAdd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteTask, updateTask } from '../store/modules/UserLoggedSlice';
import TTask from '../types/TypeTask';
import ModalEdit from '../components/ModalEdit';
import { useNavigate } from 'react-router-dom';


const Notes: React.FC = () => {
  const [favorite, setFavorite] = useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const listTaks = useAppSelector(state => state.userLogged.userLogged.tasks);
  const dispatch = useAppDispatch();
  const [task, setTask] = useState({} as TTask);
  const listFavorites = listTaks.filter((item) => item.favorite === true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const navigate = useNavigate();
  const userLogged = useAppSelector(state => state.userLogged.userLogged.email);

  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, []);

  function page(){
    setFavorite(!favorite);
  }
  
  const handleClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };
  const actionConfirm = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };
  const openModalImput = () => {
    setOpenAdd(true);
  };

  const openModalEdit = (task: TTask) => {
    setTask(task);
    console.log('bombou');
    setOpenEdit(true);
  };

  const taskFavorite = (id: number) => {
    const task = listTaks.find((item) => item.id === id);
    if (task) {
      dispatch(
        updateTask({
          ...task, favorite: !task.favorite
        }),
      );
    }
  };

  const handleDeleteCancel = () => {
    setSelectedTask(null);
    setDeleteConfirmOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask.id));
      setDeleteConfirmOpen(false);
      setSelectedTask(null);
    }
  };

  const handleDelete = (item: TTask) => {
    setSelectedTask(item);
    setDeleteConfirmOpen(true);
  };

  
  return (
    <Grid container height={'100vh'} display= 'flex' justifyContent='center'>
      <Grid item sm={12} height='100%'>
        <Box height='100%' paddingX={4} bgcolor='#f6f6f6'>
          <Typography paddingY={2} variant='h4'>{favorite? 'Recados Favoritos' : 'Todos os recados'}</Typography>
          <Grid item>
            {favorite? listFavorites.map((Task) => (
              <Grid item key={Task?.id}>
                <Divider />
                <ListItem secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      sx={{ m: 1 }}
                      onClick={() => openModalEdit(Task)} >
                      <ModeEditIcon color='secondary'/>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(Task)} edge="end" aria-label="delete" color='secondary'>
                      <DeleteIcon/>
                    </IconButton>
                  </>
                }>
                  <ListItemAvatar>
                    <IconButton onClick={() => taskFavorite(Task.id)}>
                      <FavoriteIcon  color='primary' />
                    </IconButton>
                  </ListItemAvatar>
                  <ListItemText
                    primary={Task.title}
                    secondary={Task.description}
                  />
                </ListItem>
              </Grid>
            ))  : listTaks.map((Task) => (
              <Grid item key={Task?.id}>
                <Divider />
                <ListItem secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      sx={{ m: 1 }}
                      onClick={() => openModalEdit(Task)}
                    >
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(Task)} aria-label="delete">
                      <DeleteIcon/>
                    </IconButton>
                  </>
                }>
                  <ListItemAvatar>
                    <IconButton onClick={() => taskFavorite(Task.id)}>
                      {Task.favorite?  <><FavoriteIcon color='primary'/></> :  <><FavoriteBorderIcon  color='primary'/></> }
                    </IconButton>
                  </ListItemAvatar>
                  <ListItemText
                    primary={Task.title}
                    secondary={Task.description}
                  />
                </ListItem>
              </Grid>))}
          </Grid>
        </Box>
        
      </Grid>
      <Typography
        sx={{
          position: 'absolute',

          bottom: '20px',
        }}
        variant="h5"
      >{favorite? <><Typography> <IconButton color='primary' onClick={page}>
          <ArrowBackIosNewIcon/>
        </IconButton>Todos os recados</Typography></> : <><Typography>Favoritos<IconButton color='primary' onClick={page}>
          <ArrowForwardIosIcon />
        </IconButton></Typography></> }
      </Typography>
      <Fab
        onClick={openModalImput}
        color="info"
        aria-label="add"
        sx={{
          position: 'absolute',
          right: '20px',
          bottom: '20px',
          bgcolor: '#C891B4',
        }}
      >
        <AddIcon />
      </Fab>
      <ModalInputs
        openModal={openAdd}
        actionConfirm={actionConfirm}
        actionCancel={handleClose}
      />
      {openEdit && ( <ModalEdit 
        taskEdit={task}
        openModal={openEdit}
        actionCancel={handleClose}
        actionConfirm={actionConfirm}
      ></ModalEdit>)}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>Tem certeza que deseja excluir o recado {selectedTask?.title}?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error">
                                Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Notes;
