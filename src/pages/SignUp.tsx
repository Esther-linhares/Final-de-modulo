import { Grid, Box, Typography, Link } from '@mui/material';
import React from 'react';
import Form from '../components/FormLogin';
import HeaderForm from '../components/HeaderForm';

const SignUp: React.FC = () => {

  return (
    <Grid container height="100vh">
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repete',
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          component="section"
          marginY={8}
          marginX={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <HeaderForm title="Cadastre-se" color={'primary'} />

          <Form textButton="Criar Conta" mode="signup" />

          <Typography variant="body2" color="text.secondary" marginTop={5}>
                        Copyright &copy;{' '}
            <Link
              color="inherit"
              href="www.growdev.com.br"
              target="_blank"
              variant="body2"
            >
                            Your Website
            </Link>{' '}
                        2023.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;