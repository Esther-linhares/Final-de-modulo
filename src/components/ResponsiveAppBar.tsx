import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const setting = 'Logout';

const ResponsiveAppBar: React.FC = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url: string) => {
    setAnchorElNav(null);

    navigate(url);
  };

  const handleCloseUserMenu = () => {
    navigate('/');
  };

  const handleClose = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container display={'flex'} width={'100%'} height={'100%'} justifyContent={'space-around'} alignItems={'center'}>
            <Grid item>
              <Typography
                variant="h5"
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'flex', alignSelf: 'center' },
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
              Notas
              </Typography>
            </Grid>
            <Grid item>
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ color: '#638566', bgcolor: '#acc69b' }} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleClose}
                >
                  <MenuItem key={setting}>
                    <Typography onClick={handleCloseUserMenu} textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>;
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
