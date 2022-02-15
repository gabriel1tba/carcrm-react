import { useState, useEffect, useCallback, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FcOpenedFolder } from 'react-icons/fc';
import {
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Fade,
} from '@material-ui/core';
import {
  FaPlus,
  FaEllipsisV,
  FaClipboard,
  FaUser,
  FaLink,
  FaPencilAlt,
  FaTrash,
  FaShare,
} from 'react-icons/fa';

import Header from '../../components/Header';
import Confirm from '../../components/Confirm';

import { baseURL } from '../../services/api';

import { index, destroy } from '../../store/actions/vehicles';
import { toggleScreen3 } from '../../store/actions/navigation';

const Vehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehiclesReducer.vehicles);

  const [isDeleted, setIsDeleted] = useState(null);
  const [confirmEl, setConfirmEl] = useState(null);
  const [menuEl, setMenuEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [query, setQuery] = useState({ page: 1 });

  const notes = (id) => {
    setMenuEl(null);
    dispatch(
      toggleScreen3({
        open: true,
        type: 'notes',
        props: {
          uid: id,
          type: 'vehicles',
        },
      })
    );
  };

  const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleToggleMenu = (event) => {
    setMenuEl(event.currentTarget);
  };

  const handleDispatchDestroy = async (id) => {
    setIsDeleted(id);

    try {
      const response = await dispatch(destroy(id));

      if (response) {
        setIsDeleted(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleScroll = (event) => {
    let scrollTop =
      event.srcElement.body.scrollHeight -
      (event.srcElement.body.offsetHeight + event.srcElement.body.scrollTop);
    if (scrollTop < process.env.REACT_APP_SCROLL_HEIGHT) {
      if (!isLoadMore && LoadMoreVehicles());
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {Boolean(vehicles.data.length) && (
                <div className="card-header">
                  <h6 className="m-0">Total de veículos {vehicles.total}</h6>
                </div>
              )}

              {Boolean(!vehicles.data.length) && (
                <div className="text-center mt-5 pt-5 mb-5 pb-5">
                  <FcOpenedFolder size="70" />
                  <h6 className="mt-4 text-muted">Nenhum veiculo encontrado</h6>
                </div>
              )}

              <div className="p-2 p-md-3 mt-1">
                {Boolean(vehicles.data.length) &&
                  vehicles.data.map((vehicle, index) => (
                    <Fragment key={index}>
                      <div className="d-flex card-container">
                        <div className="vehicle-img d-flex justify-content-center align-items-center">
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

                        <div className="vehicle-detail pl-3 pl-md-4">
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

                        <div className="ml-auto">
                          <IconButton id={index} onClick={handleToggleMenu}>
                            <FaEllipsisV />
                          </IconButton>

                          {Boolean(menuEl) && (
                            <Menu
                              anchorEl={menuEl}
                              getContentAnchorEl={null}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              TransitionComponent={
                                window.innerWidth < 577 ? Transition : Fade
                              }
                              open={index === parseInt(menuEl.id)}
                              onClose={() => setMenuEl(null)}
                            >
                              <MenuItem onClick={() => notes(vehicle.id)}>
                                <FaClipboard size="1.2em" className="mr-4" />{' '}
                                Notas
                              </MenuItem>
                              <MenuItem>
                                <FaUser size="1.2em" className="mr-4" />{' '}
                                Proprietário
                              </MenuItem>
                              <MenuItem>
                                <FaLink size="1.2em" className="mr-4" />{' '}
                                Visualizar
                              </MenuItem>

                              <div className="dropdown-divider" />

                              <MenuItem>
                                <Link to={`/vehicles/${vehicle.id}/edit`}>
                                  <FaPencilAlt size="1.2em" className="mr-4" />{' '}
                                  Editar
                                </Link>
                              </MenuItem>
                              <MenuItem
                                onClick={() => setConfirmEl(vehicle.id)}
                              >
                                <FaTrash size="1.2em" className="mr-4" /> Apagar
                              </MenuItem>
                              <MenuItem>
                                <FaShare size="1.2em" className="mr-4" />{' '}
                                Compartilhar
                              </MenuItem>
                            </Menu>
                          )}
                          {confirmEl && (
                            <Confirm
                              open={vehicle.id === confirmEl}
                              onConfirm={() =>
                                handleDispatchDestroy(vehicle.id)
                              }
                              onClose={() => setConfirmEl(null)}
                            />
                          )}
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
