/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import MaskedInput from 'react-text-mask';
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { toggleScreen2 } from '../../../store/actions/navigation';
import {
  cep,
  change,
  show,
  store,
  success,
  update,
} from '../../../store/actions/units';

const TextMaskCustom = ({ inputRef, name, value, ...rest }) => {
  let mask = [];

  if (name === 'phone') {
    mask = [
      '(',
      /[0-9]/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
    if (value) {
      if (value.length === 15) {
        mask = [
          '(',
          /[0-9]/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ];
      }
    }
  }

  if (name === 'cep') {
    mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  }

  return (
    <MaskedInput
      {...rest}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      guide={false}
    />
  );
};

const UnitEdit = (props) => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.unitsReducer.unit);
  const error = useSelector((state) => state.unitsReducer.error);
  const response = useSelector((state) => state.unitsReducer.success);
  const unit_id = props.uid ? props.uid : null;

  const [isLoading, setLoading] = useState(false);
  const [isLoadingCep, setLoadingCep] = useState(false);

  useEffect(() => {
    if (response && dispatch(toggleScreen2({ open: false })));
  }, [response]);

  const handleIndex = () => {
    if (unit_id) {
      dispatch(show(unit_id));
      setLoading(false);
    } else {
      dispatch(change('clear'));
      setLoading(false);
    }
  };

  useEffect(() => {
    handleIndex();
    return () => {
      dispatch(success(false));
    };
  }, []);

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
            {unit_id ? 'Editar unidade' : 'Nova unidade'}
          </Typography>

          <Button
            onClick={() =>
              unit_id ? dispatch(update(unit)) : dispatch(store(unit))
            }
            color="inherit"
            className="ml-auto"
          >
            <FaSave className="mr-2" /> Salvar
          </Button>
        </Toolbar>
      </AppBar>

      <div className="card-body scroll">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="form-group">
              <label className="label-custom">TELEFONE</label>
              <TextField
                error={error.phone && true}
                name="phone"
                type="tel"
                autoComplete="off"
                value={unit.phone || ''}
                onChange={(event) => {
                  dispatch(change({ phone: event.target.value }));
                  if (error.phone && delete error.phone);
                }}
              />
              {error.phone && (
                <strong className="text-danger">{error.phone[0]}</strong>
              )}
            </div>

            <div className="form-group">
              <label className="label-custom">TELEFONE 2</label>
              <TextField
                name="phone"
                type="tel"
                autoComplete="off"
                value={unit.phone2 || ''}
                onChange={(event) => {
                  dispatch(change({ phone2: event.target.value }));
                  if (error.phone2 && delete error.phone);
                }}
              />
            </div>

            <div className="form-group">
              <label className="label-custom">TELEFONE 3</label>
              <TextField
                name="phone"
                type="tel"
                autoComplete="off"
                InputProps={{
                  inputComponent: TextMaskCustom,
                  value: unit.phone3 || '',
                  onChange: (event) =>
                    dispatch(change({ phone3: event.target.value })),
                }}
              />
            </div>

            <h6 className="mb-4 mt-4 text-secondary">Endereço</h6>

            <div className="form-group">
              <label className="label-custom">CEP</label>
              <TextField
                style={isLoadingCep ? { opacity: 0.5 } : {}}
                type="tel"
                name="cep"
                InputProps={{
                  inputComponent: TextMaskCustom,
                  value: unit.zipCode || '',
                  onChange: (event) => {
                    dispatch(change({ zipCode: event.target.value }));
                    if (event.target.value.length > 8) {
                      setLoadingCep(true);
                      dispatch(cep(event.target.value)).then((res) =>
                        setLoadingCep(false)
                      );
                    }
                  },
                  endAdornment: (
                    <InputAdornment position="start">
                      {isLoadingCep ? <CircularProgress size={32} /> : <></>}
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <label className="label-custom">CIDADE</label>
                  <TextField disabled value={unit.city || ''} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="label-custom">UF</label>
                  <TextField disabled value={unit.uf || ''} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="label-custom">BAIRRO</label>
              <TextField
                value={unit.neighborhood || ''}
                onChange={(event) =>
                  dispatch(change({ neighborhood: event.target.value }))
                }
              />
            </div>

            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <label className="label-custom">RUA</label>
                  <TextField
                    value={unit.street || ''}
                    onChange={(event) =>
                      dispatch(change({ street: event.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="label-custom">N°</label>
                  <TextField
                    value={unit.streetNumber || ''}
                    onChange={(event) =>
                      dispatch(change({ streetNumber: event.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UnitEdit;
