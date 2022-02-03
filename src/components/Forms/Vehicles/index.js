import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, TextField, InputAdornment } from '@material-ui/core';
import MaskedInput from 'react-text-mask';

import Header from '../../Header';

import { store, show, change } from '../../../store/actions/vehicles';

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
                  <div className="col-md-7">
                    <label className="label-custom">CEP</label>
                    <TextField
                      style={isLoadingCep ? { opacity: 0.5 } : {}}
                      error={data.error?.zipCode && true}
                      type="tel"
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        value: data.vehicle.zipCode,
                        onChange: (event) => {
                          dispatch(change({ zipCode: event.target.value }));
                          if (event.target.value.length > 8) {
                            setIsLoadingCep(true);

                            if (data.error?.zipCode) {
                              delete data.error?.zipCode;
                              delete data.error?.uf;
                              delete data.error?.city;
                            }
                          }
                        },
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
