import { useState, useEffect, useCallback, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Button } from '@material-ui/core';
import { FaPlus } from 'react-icons/fa';

import Header from '../../components/Header';

import { baseURL } from '../../services/api';

import { index } from '../../store/actions/vehicles';

const Vehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehiclesReducer.vehicles);

  const [isDeleted, setIsDeleted] = useState(null);
  const [confirmEl, setConfirmEl] = useState(null);
  const [menuEl, setMenuEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [query, setQuery] = useState({ page: 1 });

  const handleDispatchIndex = useCallback(
    async (loadMore) => {
      try {
        const response = await dispatch(index(query, loadMore));
        if (response) {
          setIsLoading(false);

          if (isLoadMore) setIsLoadMore(false);
        }
      } catch (error) {}
    },
    [dispatch, isLoadMore, query]
  );

  useEffect(() => {
    handleDispatchIndex();
  }, [handleDispatchIndex]);

  const LoadMoreVehicles = useCallback(() => {
    if (vehicles.current_page < vehicles.last_page) {
      setQuery(
        {
          ...query,
          page: query.page + 1,
        },
        () => {
          handleDispatchIndex(true);
        }
      );
    }
  }, [handleDispatchIndex, query, vehicles.current_page, vehicles.last_page]);

  const handleScroll = useCallback(
    (event) => {
      let scrollTop =
        event.srcElement.body.scrollHeight -
        (event.srcElement.body.offsetHeight + event.srcElement.body.scrollTop);
      if (scrollTop < process.env.SCROLL_HEIGHT) {
        if (!isLoadMore && LoadMoreVehicles());
      }
    },
    [LoadMoreVehicles, isLoadMore]
  );

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <Header title="Veículos" />;
      <div className="container mt-4 pt-3">
        {isLoading ? (
          <div className="d-flex justify-content-center mb-4 ">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="d-flex mb-4">
              <h3 className="font-weight-normal">Veículos</h3>
              <Link to="/vehicles/create" className="ml-auto">
                <Button variant="contained" color="primary" size="large">
                  <FaPlus size="1.5rem" className="mr-2" /> Cadastrar
                </Button>
              </Link>
            </div>

            <div className="card">
              {vehicles.data.length > 0 && (
                <div className="card-header">
                  <h6 className="m-0">Total de veículos {vehicles.total}</h6>
                </div>
              )}

              <div className="p-2 p-md-3">
                {vehicles.data.length &&
                  vehicles.data.map((vehicle, index) => (
                    <Fragment key={index}>
                      <div className="d-md-flex">
                        <div className="d-flex">
                          <div className="vehicle-image d-flex justify-content-center align-items-center">
                            {isDeleted === vehicle.id ? (
                              <CircularProgress color="secondary" />
                            ) : vehicle.cover ? (
                              <img
                                src={`${baseURL}thumb/vehicles/${vehicle.cover.img}?u=${vehicle.cover.user_id}&s=${vehicle.cover.vehicle_id}&h=250&w=250`}
                                alt="Foto ilustrativa de um carro"
                                className="shadow rounded"
                              />
                            ) : null}
                          </div>

                          <div className="vehicle-details pl-3 pl-md-4">
                            <h6>
                              {vehicle.vehicle_brand.label}{' '}
                              {vehicle.vehicle_model.label}
                            </h6>
                            <strong className="d-block">
                              {vehicle.vehicle_version.label}
                            </strong>

                            {vehicle.vehicle_price && (
                              <strong className="text-danger h5 d-block">
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                }).format(vehicle.vehicle_price)}
                              </strong>
                            )}
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Vehicles;
