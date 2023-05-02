import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser, selectAllUsers } from '../store/modules/UsersSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loggedUserSlice, setuserLogged } from '../store/modules/UserLoggedSlice';

interface FormProps {
	mode: 'signin' | 'signup';
	textButton: string;
}

const Form: React.FC<FormProps> = ({ mode, textButton }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepassword, setErrorRepassword] = useState(false);
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'signup') {

      const emailValid =
				(email.endsWith('.com') || email.endsWith('.com.br')) &&
				email.includes('@');

      if (email.length > 0) {
        setErrorEmail(!emailValid);
      }

      const passwordValid = password.length >= 6;
      if (password.length > 0) {
        setErrorPassword(!passwordValid);
      }

      const repasswordValid = password === repassword;

      if (repassword.length > 0) {
        setErrorRepassword(!repasswordValid);
      }

      setDisabled(!(emailValid && passwordValid && repasswordValid));
    }
  }, [email, password, repassword, mode]);

  useEffect(() => {
    // console.log(users);
    localStorage.setItem('listaUsuarios', JSON.stringify(users));
  }, [users]);

  function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (mode === 'signin') {
      const user = {
        email: email,
        password: password,
      };

      const userExist = users.find(
        (value) =>
          value.email === user.email &&
					value.password === user.password
      );
      if (!userExist) {
        alert('Usuário ou senha incorretos');
        return;
      }

      dispatch(setuserLogged({email: userExist.email, password: userExist.password, tasks: userExist.tasks}));
      navigate('/notes');
    } else {
      const newUser = {
        email,
        password,
        tasks: [],
      };

      const retorno = users.some(
        (value) => value.email === newUser.email
      );
      if (retorno) {
        alert('E-mail já cadastrado');
        return;
      }
      dispatch(addUser(newUser));
    }
  }
  return (
    <Box component="form" marginTop={1} onSubmit={(ev) => handleSubmit(ev)}>
      <TextField
        error={errorEmail}
        helperText={errorEmail ? 'E-mail inválido' : ''}
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        margin="normal"
        variant="outlined"
        type="email"
        required
        id="email"
        label="E-mail"
        fullWidth
      />
      <TextField
        error={errorPassword}
        helperText={
          errorPassword
            ? 'Senha deve conter ao menos 6 caracteres'
            : ''
        }
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        margin="normal"
        variant="outlined"
        type="password"
        required
        id="password"
        label="Senha"
        fullWidth
      />

      {mode === 'signup' ? (
        <TextField
          error={errorRepassword}
          helperText={
            errorRepassword ? 'As senhas não coincidem' : ''
          }
          value={repassword}
          onChange={(ev) => setRepassword(ev.target.value)}
          margin="normal"
          variant="outlined"
          type="password"
          required
          id="repassword"
          label="Repetir Senha"
          fullWidth
        />
      ) : ''}

      <Button
        disabled={disabled}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        {textButton}
      </Button>
      <Grid container>
        <Grid item xs={8} textAlign="end">
          {mode === 'signin' ? (
            <Typography variant="body2">
              <Link style={{ color: 'inherit' }} to="/signup">
                            Não tem uma conta? Cadastre-se
              </Link>
            </Typography>
          ) : (
            <Typography variant="body2">
              <Link style={{ color: 'inherit' }} to="/signin">
                            Já possui conta? Vá para Login
              </Link>
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;