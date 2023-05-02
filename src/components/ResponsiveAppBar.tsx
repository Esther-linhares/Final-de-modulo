import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters  sx={{display:'flex',
          justifyContent:'space-between',}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              
              fontWeight: 700,
              fontFamily: 'monospace',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Bem-vindo(a) esther@teste.com
          </Typography>
          <Avatar>E</Avatar>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
