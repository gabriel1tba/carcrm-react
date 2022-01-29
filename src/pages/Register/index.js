import { Link, Redirect } from 'react-router-dom';
import { TextField, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { editRegister, register } from '../../store/actions/register';

import logoImg from '../../assets/logo.png';

const Register = () => {
  const dispatch = useDispatch();
  const { user, error, success } = useSelector(
    (state) => state.registerReducer
  );

  return (
    <div className="d-flex bg-white min-vh-100">
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <div className="form-group text-center">
              <img height="48" src={logoImg} alt="Logo" />
              <Typography className="mt-3" component="h1" variant="h6">
                Cria sua conta, e teste gratis!
              </Typography>
            </div>

            <TextField
              error={error.name && true}
              margin="normal"
              label="Nome"
              value={user.name}
              onChange={(text) => {
                dispatch(editRegister({ name: text.target.value }));
                if (error.name && delete error.name);
              }}
            />
            {error.name && (
              <small className="text-danger">{error.name[0]}</small>
            )}

            <TextField
              error={error.email && true}
              margin="normal"
              label="E-mail"
              value={user.email}
              type="email"
              autoComplete="email"
              onChange={(text) => {
                dispatch(editRegister({ email: text.target.value }));
                if (error.email && delete error.email);
              }}
            />
            {error.email && (
              <small className="text-danger">{error.email[0]}</small>
            )}

            <TextField
              error={error.password && true}
              margin="normal"
              label="Senha"
              type="password"
              value={user.password}
              onChange={(text) => {
                dispatch(editRegister({ password: text.target.value }));
                if (error.password && delete error.password);
              }}
            />
            {error.password && (
              <small className="text-danger">{error.password[0]}</small>
            )}

            <TextField
              label="Confirmar Senha"
              type="password"
              value={user.password_confirmation}
              error={error.password_confirmation && true}
              onChange={(text) => {
                dispatch(
                  editRegister({ password_confirmation: text.target.value })
                );
                if (
                  error.password_confirmation &&
                  delete error.password_confirmation
                );
              }}
            />

            {error.password_confirmation && (
              <small className="text-danger">
                {error.password_confirmation[0]}
              </small>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className="mt-4 mb-4"
              onClick={() => dispatch(register(user))}
            >
              Cadastrar
            </Button>

            <p className="text-center">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary">
                Faça Login
              </Link>
            </p>
            {success && <Redirect to="/vehicles" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
