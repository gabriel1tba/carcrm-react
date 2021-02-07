import { TextField, Typography, Button } from '@material-ui/core';

function Register() {
  return (
    <div className="d-flex bg-white min-vh-100">
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <div className="form-group text-center">
              <img height="48" src="/logo.png" alt="Logo" />
              <Typography className="mt-3" component="h1" variant="h6">
                Cria sua conta, e teste gratis!
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
