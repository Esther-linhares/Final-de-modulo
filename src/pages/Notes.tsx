import React, { useState, useCallback } from 'react';
import { Grid,Box } from '@mui/material';
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
import { updateTask } from '../store/modules/UserLoggedSlice';




const Notes: React.FC = () => {
  const [favorite, setFavorite] = useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const listTaks = useAppSelector(state => state.userLogged.userLogged.tasks);
  const dispatch = useAppDispatch();

  const listFavorites = listTaks.filter((item) => item.favorite === true);

  function page(){
    setFavorite(!favorite);
  }
  /*  const openRemoveModal = useCallback(() => {
    setOpenConfirm(true);
  }, []); */

  const handleClose = () => {
    setOpenAdd(false);
  };
  const addNotes = () => {
    console.log('funcionando');
    setOpenAdd(false);
  };
  const openModalImput = () => {
    setOpenAdd(true);
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
                    >
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
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
                    >
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
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
      >{favorite? <><Typography> <IconButton onClick={page}>
          <ArrowBackIosNewIcon/>
        </IconButton>Todos os recados</Typography></> : <><Typography>Favoritos<IconButton onClick={page}>
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
          bgcolor: '#222',
        }}
      >
        <AddIcon />
      </Fab>
      <ModalInputs
        openModal={openAdd}
        actionConfirm={addNotes}
        actionCancel={handleClose}
      />
    </Grid>
  );
};

export default Notes;
