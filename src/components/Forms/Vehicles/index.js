import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-text-mask';
import ArrayMove from 'array-move';
import {
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import Header from '../../Header';

import {
  store,
  show,
  change,
  cep,
  brand,
  model,
  version,
  uploadPhoto,
  deletePhoto,
  reorderPhoto,
} from '../../../store/actions/vehicles';

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

const NumberFormatCustom = ({ inputRef, onChange, ...other }) => (
  <NumberFormat
    {...other}
    decimalSeparator=","
    thousandSeparator="."
    onValueChange={(values) => {
      onChange({
        target: {
          value: values.value,
        },
      });
    }}
    prefix={other.name}
  />
);

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

  const handleSelectCategory = async (value) => {
    dispatch(
      change({
        vehicle_type: value,
        vehicle_brand: null,
        vehicle_model: null,
        vehicle_version: null,
        vehicle_gearbox: null,
        vehicle_fuel: null,
        vehicle_steering: null,
        vehicle_motorpower: null,
        vehicle_doors: null,
      })
    );

    dispatch(brand(value));
    if (data.error?.vehicle_type) {
      delete data.error?.vehicle_type;
    }
  };

  const handleSelectBrand = async (value) => {
    dispatch(
      change({
        vehicle_brand: value,
        vehicle_model: null,
        vehicle_version: null,
      })
    );

    dispatch(model(data.vehicle.vehicle_type, value));

    if (data.error?.vehicle_brand) {
      delete data.error?.vehicle_brand;
    }
  };

  const handleSelectModel = async (value) => {
    dispatch(
      change({
        vehicle_model: value,
        vehicle_version: null,
      })
    );

    dispatch(version(data.vehicle.vehicle_brand, value));

    if (data.error?.vehicle_model) {
      delete data.error?.vehicle_model;
    }
  };

  const handleSelectRegDate = (value) => {
    dispatch(change({ vehicle_regdate: value }));

    if (data.error?.vehicle_regdate) {
      delete data.error?.vehicle_regdate;
    }
  };

  const handleSelectVersion = (value) => {
    dispatch(change({ vehicle_version: value }));

    if (data.error?.vehicle_version) {
      delete data.error?.vehicle_version;
    }
  };

  const handleSelectGearbox = (value) => {
    dispatch(change({ vehicle_gearbox: value }));
  };

  const handleSelectFuel = (value) => {
    dispatch(change({ vehicle_fuel: value }));
  };

  const handleSelectSteering = (value) => {
    dispatch(change({ vehicle_steering: value }));
  };

  const handleSelectMotorpower = (value) => {
    dispatch(change({ vehicle_motorpower: value }));
  };

  const handleSelectDoors = (value) => {
    dispatch(change({ vehicle_doors: value }));
  };

  const handleSelectCubiccms = (value) => {
    dispatch(change({ vehicle_cubiccms: value }));
  };

  const handleSelectColor = (value) => {
    dispatch(change({ vehicle_color: value }));
  };

  const handleCheckFeatures = (value) => {
    const checkedValue = data.vehicle.vehicle_features[value]
      ? delete data.vehicle.vehicle_features[value]
      : { [value]: value };

    dispatch(
      change({
        vehicle_features: {
          ...data.vehicle.vehicle_features,
          checkedValue,
        },
      })
    );
  };

  const handleCheckFinancial = (value) => {
    const checkedValue = data.vehicle.vehicle_financial[value]
      ? delete data.vehicle.vehicle_financial[value]
      : { [value]: value };

    dispatch(
      change({
        vehicle_financial: {
          ...data.vehicle.vehicle_financial,
          checkedValue,
        },
      })
    );
  };

  const handleUploadPhoto = async (event) => {
    [...event.target.files].forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', data.vehicle.id);

      dispatch(uploadPhoto(formData));
    });

    if (data.error?.photos) {
      delete data.error?.photos;
    }
  };

  const handleDeletePhoto = async (id) => {
    setIsDeleted(id);
    try {
      const response = await dispatch(deletePhoto(id));
      setIsDeleted(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newPhotos = ArrayMove(
      data.vehicle.vehicle_photos,
      oldIndex,
      newIndex
    );
    const newPhotosId = newPhotos.map((photo) => photo.id);

    dispatch(reorderPhoto({ order: newPhotosId }, newPhotos));
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
                        value: data.vehicle.zipCode || '',
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

                    {data?.error?.zipCode && (
                      <strong className="text-danger">
                        {data?.error?.zipCode[0]}
                      </strong>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-9 form-group">
                    <label className="label-custom">CIDADE</label>
                    <TextField
                      error={data.error?.city && true}
                      disabled
                      value={data.vehicle.city || ''}
                    />
                    {data?.error?.city && (
                      <strong className="text-danger">
                        {data?.error?.city[0]}
                      </strong>
                    )}
                  </div>
                  <div className="col-md-3 form-group">
                    <label className="label-custom">UF</label>
                    <TextField
                      error={data.error?.uf && true}
                      disabled
                      value={data.vehicle.uf || ''}
                    />
                    {data?.error?.uf && (
                      <strong className="text-danger">
                        {data?.error?.uf[0]}
                      </strong>
                    )}
                  </div>
                </div>
              </div>

              <h3 className="font-weight-normal mt-4 mb-4">Dados do veículo</h3>

              <div className="card card-body">
                <div className="form-group">
                  <label className="label-custom">CATEGORIA</label>
                  <Select
                    error={data.error?.vehicle_type && true}
                    value={data.vehicle.vehicle_type || ''}
                    onChange={(event) =>
                      handleSelectCategory(event.target.value)
                    }
                  >
                    {data.vehicle_types.map((item) => (
                      <MenuItem key={item.id} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {data?.error?.vehicle_type && (
                    <strong className="text-danger">
                      {data?.error?.vehicle_type[0]}
                    </strong>
                  )}
                </div>

                <div className="form-group">
                  <label className="label-custom">MARCAS</label>
                  <Select
                    error={data.error?.vehicle_brand && true}
                    value={data.vehicle.vehicle_brand || ''}
                    onChange={(event) => handleSelectBrand(event.target.value)}
                  >
                    {data.vehicle_brand.map((item) => (
                      <MenuItem key={item.id} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {data?.error?.vehicle_brand && (
                    <strong className="text-danger">
                      {data?.error?.vehicle_brand[0]}
                    </strong>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 form-group">
                    <label className="label-custom">MODELO</label>
                    <Select
                      error={data.error?.vehicle_model && true}
                      value={data.vehicle.vehicle_model || ''}
                      onChange={(event) =>
                        handleSelectModel(event.target.value)
                      }
                    >
                      {data.vehicle_model.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {data?.error?.vehicle_model && (
                      <strong className="text-danger">
                        {data?.error?.vehicle_model[0]}
                      </strong>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label className="label-custom">ANO DO MODELO</label>
                    <Select
                      error={data.error?.vehicle_regdate && true}
                      value={data.vehicle.vehicle_regdate || ''}
                      onChange={(event) =>
                        handleSelectRegDate(event.target.value)
                      }
                    >
                      {data.regdate.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {data?.error?.vehicle_regdate && (
                      <strong className="text-danger">
                        {data?.error?.vehicle_regdate[0]}
                      </strong>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="label-custom">VERSÃO</label>
                  <Select
                    error={data.error?.vehicle_version && true}
                    value={data.vehicle.vehicle_version || ''}
                    onChange={(event) =>
                      handleSelectVersion(event.target.value)
                    }
                  >
                    {data.vehicle_version.map((item) => (
                      <MenuItem key={item.id} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {data?.error?.vehicle_version && (
                    <strong className="text-danger">
                      {data?.error?.vehicle_version[0]}
                    </strong>
                  )}
                </div>
              </div>

              <div className="card card-body mt-4">
                <div className="row">
                  {/* EXIBE APENAS SE FOR CARROS */}
                  {data.vehicle.vehicle_type === 2020 && (
                    <>
                      <div className="col-md-6 form-group">
                        <label className="label-custom">CÂMBIO</label>
                        <Select
                          value={data.vehicle.vehicle_gearbox || ''}
                          onChange={(event) =>
                            handleSelectGearbox(event.target.value)
                          }
                        >
                          {data.gearbox.map((item) => (
                            <MenuItem key={item.id} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="label-custom">COMBUSTÍVEL</label>
                        <Select
                          value={data.vehicle.vehicle_fuel || ''}
                          onChange={(event) =>
                            handleSelectFuel(event.target.value)
                          }
                        >
                          {data.fuel.map((item) => (
                            <MenuItem key={item.id} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="label-custom">DIREÇÃO</label>
                        <Select
                          value={data.vehicle.vehicle_steering || ''}
                          onChange={(event) =>
                            handleSelectSteering(event.target.value)
                          }
                        >
                          {data.car_steering.map((item) => (
                            <MenuItem key={item.id} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="label-custom">
                          POTÊNCIA DO MOTOR
                        </label>
                        <Select
                          value={data.vehicle.vehicle_motorpower || ''}
                          onChange={(event) =>
                            handleSelectMotorpower(event.target.value)
                          }
                        >
                          {data.motorpower.map((item) => (
                            <MenuItem key={item.id} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="label-custom">PORTAS</label>
                        <Select
                          value={data.vehicle.vehicle_doors || ''}
                          onChange={(event) =>
                            handleSelectDoors(event.target.value)
                          }
                        >
                          {data.doors.map((item) => (
                            <MenuItem key={item.id} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </>
                  )}

                  {/* EXIBE APENAS SE FOR MOTOS */}
                  {data.vehicle.vehicle_type === 2060 && (
                    <div className="col-md-6 form-group">
                      <label className="label-custom">CILINDRADAS</label>
                      <Select
                        value={data.vehicle.vehicle_cubiccms || ''}
                        onChange={(event) =>
                          handleSelectCubiccms(event.target.value)
                        }
                      >
                        {data.cubiccms.map((item) => (
                          <MenuItem key={item.id} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  )}

                  <div className="col-md-6 form-group">
                    <label className="label-custom">COR</label>
                    <Select
                      value={data.vehicle.vehicle_color || ''}
                      onChange={(event) =>
                        handleSelectColor(event.target.value)
                      }
                    >
                      {data.carcolor.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="label-custom">QUILOMETRAGEM</label>
                    <TextField
                      type="tel"
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                        value: data.vehicle.vehicle_mileage || '',
                        onChange: (event) =>
                          dispatch(
                            change({ vehicle_mileage: event.target.value })
                          ),
                      }}
                    />
                  </div>
                </div>
              </div>

              {data.vehicle.vehicle_type && (
                <>
                  <h3 className="font-weight-normal mt-4 mb-4">
                    Items e Opcionais
                  </h3>
                  <div className="card card-body">
                    <div className="row">
                      {data.features.map(
                        (item) =>
                          item.vehicle_type_id ===
                            data.vehicle.vehicle_type && (
                            <div className="col-md-6" key={item.id}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      data.vehicle.vehicle_features[item.value]
                                    }
                                    onChange={() =>
                                      handleCheckFeatures(item.value)
                                    }
                                    color="primary"
                                  />
                                }
                                label={item.label}
                              />
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </>
              )}

              <h3 className="font-weight-normal mt-4 mb-4">Financeiro</h3>
              <div className="card card-body">
                <div className="form-group">
                  <label className="label-custom">Estado Financeiro</label>
                  <div className="row">
                    {data.financial.map((item) => (
                      <div className="col-md-6" key={item.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                data.vehicle.vehicle_financial[item.value]
                              }
                              onChange={() => handleCheckFinancial(item.value)}
                              color="primary"
                            />
                          }
                          label={item.label}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 form-group">
                    <label className="label-custom">PREÇO</label>
                    <TextField
                      type="tel"
                      name="R$ "
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                        value: data.vehicle.vehicle_price || '',
                        onChange: (event) => {
                          dispatch(
                            change({ vehicle_price: event.target.value })
                          );

                          if (data.error?.vehicle_price) {
                            delete data.error?.vehicle_price;
                          }
                        },
                      }}
                    />

                    {data?.error?.vehicle_price && (
                      <strong className="text-danger">
                        {data?.error?.vehicle_price[0]}
                      </strong>
                    )}
                  </div>
                </div>
              </div>

              <h3 className="font-weight-normal mt-4 mb-4">
                Descrição do anúncio
              </h3>
              <div className="card card-body">
                <div className="form-group">
                  <label className="label-custom">TÍTULO</label>
                  <TextField
                    value={data.vehicle.title || ''}
                    onChange={(event) =>
                      dispatch(change({ title: event.target.value }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="label-custom">DESCRIÇÃO</label>
                  <TextField
                    multiline
                    rows={5}
                    rowsMax={5}
                    value={data.vehicle.description || ''}
                    onChange={(event) =>
                      dispatch(change({ description: event.target.value }))
                    }
                  />
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
