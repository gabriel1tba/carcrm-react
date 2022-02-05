import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';
import MaskedInput from 'react-text-mask';

import Header from '../../Header';

import { store, show, change, cep } from '../../../store/actions/vehicles';

const TextMaskCustom = ({ inputRef, ...other }) => {
  const mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      guide={false}
    />
  );
};

const VehiclesForm = ({ match }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vehiclesReducer);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isDeleted, setIsDeleted] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [tips, setTips] = useState(0);
  const [confirmEl, setConfirmEl] = useState(null);

  const vehicle_id = useMemo(() => {
    if (match.params.id) {
      return match.params.id;
    }
    return null;
  }, [match.params.id]);

  const handleShowOrStoreVehicle = async () => {
    if (vehicle_id) {
      const response = await dispatch(show(vehicle_id));

      if (response) {
        setIsLoading(false);
      }
    } else {
      const response = await dispatch(store());

      if (response) {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const handleFillZipCode = async (value) => {
    dispatch(change({ zipCode: value }));
    if (value.length > 8) {
      setIsLoadingCep(true);

      const response = await dispatch(cep(value));

      if (response) setIsLoadingCep(false);

      if (data.error?.zipCode) {
        delete data.error?.zipCode;
        delete data.error?.uf;
        delete data.error?.city;
      }
    }
  };

  useEffect(() => {
    handleShowOrStoreVehicle();
  }, []);

  return (
    <>
      <Header title="Veículos - Gestão" />
      <div className="container mt-4 pt-3">
        {isLoading ? (
          <div className="d-flex justify-content-center mb-4 ">
            <CircularProgress />
          </div>
        ) : (
          <div className="row">
            <div className="col-md-7">
              <h3 className="font-weight-normal mb-4">
                Localização do veículo
              </h3>
              <div className="card card-body">
                <div className="row">
                  <div className="col-md-7 form-group">
                    <label className="label-custom">CEP</label>
                    <TextField
                      style={isLoadingCep ? { opacity: 0.5 } : {}}
                      error={data.error?.zipCode && true}
                      type="tel"
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        value: data.vehicle.zipCode,
                        onChange: (event) =>
                          handleFillZipCode(event.target.value),
                        endAdornment: (
                          <InputAdornment position="start">
                            {isLoadingCep ? (
                              <CircularProgress size={32} />
                            ) : (
                              <></>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />

                    {data?.error?.zipCode ? (
                      <strong className="text-danger">
                        {data?.error?.zipCode[0]}
                      </strong>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-9 form-group">
                    <label className="label-custom">CIDADE</label>
                    <TextField
                      error={data.error?.city && true}
                      disabled
                      value={data.vehicle.city}
                    />
                    {data?.error?.city ? (
                      <strong className="text-danger">
                        {data?.error?.city[0]}
                      </strong>
                    ) : null}
                  </div>
                  <div className="col-md-3 form-group">
                    <label className="label-custom">UF</label>
                    <TextField
                      error={data.error?.uf && true}
                      disabled
                      value={data.vehicle.uf}
                    />
                    {data?.error?.uf ? (
                      <strong className="text-danger">
                        {data?.error?.uf[0]}
                      </strong>
                    ) : null}
                  </div>
                </div>
              </div>

              <h3 className="font-weight-normal mt-4 mb-4">Dados do veículo</h3>

              <div className="card card-body">
                <div className="form-group">
                  <label className="label-custom">CATEGORIA</label>
                  <Select
                    error={data.error?.vehicle_type && true}
                    value={data.vehicle.vehicle_type}
                  >
                    {data.vehicle_types.map((item) => (
                      <MenuItem key={item.id} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <div className="col-md-5"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default VehiclesForm;
