import { Link, Redirect } from 'react-router-dom';
import { Typography, TextField, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { editAuth, login } from '../../store/actions/auth';

import logoImg from '../../assets/logo.png';

const Auth = () => {
  const dispatch = useDispatch();
  const { credentials, success } = useSelector((state) => state.authReducer);

  return (
    <div className="d-flex bg-white min-vh-100 ">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="form-group text-center">
              <img src={logoImg} alt="Car CRM logo" height="48" />
              <Typography className="mt-3" variant="h6" component="h1">
                Plataforma para revenda de veículos
              </Typography>
            </div>

            <TextField
              label="E-mail"
              type="email"
              autoComplete="email"
              value={credentials.email}
              onChange={(event) =>
                dispatch(editAuth({ email: event.target.value }))
              }
              margin="normal"
            />

            <TextField
              label="Senha"
              type="password"
              value={credentials.password}
              onChange={(event) =>
                dispatch(editAuth({ password: event.target.value }))
              }
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className="mt-4 mb-4"
              onClick={() => dispatch(login(credentials))}
            >
              Entrar
            </Button>

            <p className="text-center">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary">
                Cadastre-se
              </Link>
            </p>

            {success && <Redirect to="/vehicles" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
