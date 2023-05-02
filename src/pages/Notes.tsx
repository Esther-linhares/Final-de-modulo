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
import ModalInputs from '../components/ModalInputs';
import { useAppSelector } from '../store/hooks';
import { SelectAllTasks } from '../store/modules/TasksSlice';



const Notes: React.FC = () => {
  const [favorite, setFavorite] = useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [listTaks, setListTasks] = useAppSelector(SelectAllTasks);


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

  
  return (
    <Grid container height={'100vh'} display= 'flex' justifyContent='center'>
      <Grid item sm={12} height='100%'>
        <Box height='100%' paddingX={4} bgcolor='#f6f6f6'>
          <Typography paddingY={2} variant='h4'>{favorite? 'Recados Favoritos' : 'Todos os recados'}</Typography>

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
              <IconButton>
                <FavoriteIcon  color='primary' />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={'favorito'}
              secondary={'descrição'}
            />
          </ListItem>
          <Divider />
          <ListItem
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  sx={{ m: 1 }}
                >
                  <ModeEditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  /* onClick={openRemoveModal} */
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <IconButton>
                <FavoriteBorderIcon  color='primary'/>
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={'não favorito'}
              secondary={'descrição'}
            />
          </ListItem>
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
        title="Adicionar"
        description="Escreva o recado aqui bçabçla"
        openModal={openAdd}
        actionConfirm={addNotes}
        actionCancel={handleClose}
      />
    </Grid>
  );
};

export default Notes;
