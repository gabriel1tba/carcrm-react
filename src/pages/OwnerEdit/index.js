/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaSave } from 'react-icons/fa';
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { toggleScreen2 } from '../../store/actions/navigation';

import {
  store,
  show,
  update,
  cep,
  change,
  success,
} from '../../store/actions/owners';

const OwnerEdit = (props) => {
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.ownersReducer.owner);
  const error = useSelector((state) => state.ownersReducer.error);
  const response = useSelector((state) => state.ownersReducer.success);
  const owner_id = props.owner_id ? props.owner_id : null;

  const [isLoading, setLoading] = useState(true);
  const [isLoadingCep, setLoadingCep] = useState(false);

  const handleDispatchIndex = () => {
    if (owner_id) {
      dispatch(show(owner_id)).then((res) => res && setLoading(false));
    } else {
      dispatch(change('clear'));
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDispatchIndex();
    return () => {
      dispatch(success(false));
    };
  }, []);

  useEffect(() => {
    if (response && dispatch(toggleScreen2({ open: false })));
  }, [response]);

  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            onClick={() => dispatch(toggleScreen2({ open: false }))}
            edge="start"
            color="inherit"
          >
            <MdKeyboardBackspace />
          </IconButton>

          <Typography variant="h6" color="inherit">
            {owner_id ? 'Editar proprietário' : 'Novo proprietário'}
          </Typography>

          <Button
            onClick={() =>
              owner_id ? dispatch(update(owner)) : dispatch(store(owner))
            }
            color="inherit"
            className="ml-auto"
          >
            <FaSave className="mr-2" /> Salvar
          </Button>
        </Toolbar>
      </AppBar>

      <div className="scroll card-body">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            <CircularProgress />
          </div>
        ) : (
          <>
            <h6 className="mb-4 text-secondary">Dados pessoais</h6>
            <div className="form-group">
              <label className="label-custom">NOME</label>
              <TextField
                error={error.name && true}
                value={owner.name || ''}
                onChange={(event) => {
                  dispatch(change({ name: event.target.value }));
                  if (error.name && delete error.name);
                }}
              />

              {error.name && (
                <strong className="text-danger">{error.name[0]}</strong>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OwnerEdit;
