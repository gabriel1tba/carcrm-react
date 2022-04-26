/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import DateFnsUtils from '@date-io/date-fns';
import { pt } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardBackspace } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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

import { toggleScreen2 } from '../../store/actions/navigation';

import {
  store,
  show,
  update,
  cep,
  change,
  success,
} from '../../store/actions/owners';

const TextMaskCustom = ({ inputRef, name, ...rest }) => {
  let mask = [];

  if (name === 'cpf') {
    mask = [
      /[0-9]/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ];
  }

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
    if (rest.value) {
      if (rest.value.length === 15) {
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

const OwnerEdit = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ownersReducer.error);
  const response = useSelector((state) => state.ownersReducer.success);
  const owner = props.item;

  const [isLoading, setLoading] = useState(true);
  const [isLoadingCep, setLoadingCep] = useState(false);

  const handleDispatchIndex = () => {
    if (owner) {
      dispatch(show(owner));
      setLoading(false);
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
            {owner ? 'Editar proprietário' : 'Novo proprietário'}
          </Typography>

          <Button
            onClick={() =>
              owner ? dispatch(update(owner)) : dispatch(store(owner))
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

            <div className="form-group">
              <label className="label-custom">TIPO DE PESSOA</label>
              <br />
              <div className="btn-group option-group" role="group">
                <button
                  onClick={() => dispatch(change({ type: 0 }))}
                  className={!owner.type ? 'btn btn-primary' : 'btn btn-light'}
                >
                  PESSOA FISICA
                </button>
                <button
                  onClick={() => dispatch(change({ type: 1 }))}
                  className={owner.type ? 'btn btn-primary' : 'btn btn-light'}
                >
                  PESSOA JURIDICA
                </button>
              </div>
            </div>

            {!owner.type && (
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label-custom">CPF</label>
                    <TextField
                      name="cpf"
                      type="tel"
                      autoComplete="off"
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        value: owner.cpf,
                        onChange: (event) =>
                          dispatch(change({ cpf: event.target.value })),
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label-custom">RG</label>
                    <TextField
                      type="tel"
                      value={owner.rg || ''}
                      onChange={(event) =>
                        dispatch(change({ rg: event.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {owner.type === 1 && (
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label-custom">CNPJ</label>
                    <TextField
                      type="tel"
                      value={owner.cnpj || ''}
                      onChange={(event) =>
                        dispatch(change({ cnpj: event.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="label-custom">INSCR. ESTADUAL</label>
                    <TextField
                      type="tel"
                      value={owner.ie || ''}
                      onChange={(event) =>
                        dispatch(change({ ie: event.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="label-custom">NASCIMENTO</label>
              <MuiPickersUtilsProvider locale={pt} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="dd/MM/yyyy"
                  value={owner.birth ? owner.birth : null}
                  onChange={(date) => dispatch(change({ birth: date }))}
                />
              </MuiPickersUtilsProvider>
            </div>

            <h6 className="mb-4 mt-4 text-secondary">Dados de contato</h6>

            <div className="form-group">
              <label className="label-custom">EMAIL</label>
              <TextField
                type="email"
                value={owner.email || ''}
                onChange={(event) =>
                  dispatch(change({ email: event.target.value }))
                }
              />
            </div>

            <div className="form-group">
              <label className="label-custom">TELEFONE</label>
              <TextField
                error={error.phone && true}
                name="phone"
                type="tel"
                autoComplete="off"
                InputProps={{
                  inputComponent: TextMaskCustom,
                  value: owner.phone,
                  onChange: (event) => {
                    dispatch(change({ phone: event.target.value }));
                    if (error.phone && delete error.phone);
                  },
                }}
              />
              {error.phone && (
                <strong className="text-danger">{error.phone[0]}</strong>
              )}
            </div>

            {owner.phone && (
              <div className="form-group">
                <label className="label-custom">TELEFONE 2</label>
                <TextField
                  name="phone"
                  type="tel"
                  autoComplete="off"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                    value: owner.phone2,
                    onChange: (event) =>
                      dispatch(change({ phone2: event.target.value })),
                  }}
                />
              </div>
            )}

            {owner.phone2 && (
              <div className="form-group">
                <label className="label-custom">TELEFONE 3</label>
                <TextField
                  name="phone"
                  type="tel"
                  autoComplete="off"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                    value: owner.phone3,
                    onChange: (event) =>
                      dispatch(change({ phone3: event.target.value })),
                  }}
                />
              </div>
            )}

            <h6 className="mb-4 mt-4 text-secondary">Endereço</h6>

            <div className="form-group">
              <label className="label-custom">CEP</label>
              <TextField
                style={isLoadingCep ? { opacity: 0.5 } : {}}
                type="tel"
                name="cep"
                InputProps={{
                  inputComponent: TextMaskCustom,
                  value: owner.zipCode,
                  onChange: (event) => {
                    dispatch(change({ zipCode: event.target.value }));
                    if (event.target.value.length > 8) {
                      setLoadingCep(true);
                      dispatch(cep(event.target.value)).then(() =>
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
                  <TextField disabled value={owner.city || ''} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="label-custom">UF</label>
                  <TextField disabled value={owner.uf || ''} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="label-custom">BAIRRO</label>
              <TextField
                value={owner.neighborhood || ''}
                disabled
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
                    value={owner.street || ''}
                    disabled
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
                    value={owner.streetNumber || ''}
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

export default OwnerEdit;
