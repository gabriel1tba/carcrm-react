/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FcOpenedFolder } from 'react-icons/fc';
import {
  AppBar,
  CircularProgress,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { toggleScreen2 } from '../../store/actions/navigation';

import { vehicles } from '../../store/actions/owners';
import { baseURL } from '../../services/api';

const OwnerVehicles = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.ownersReducer.vehicles);

  const [isLoading, setLoading] = useState(true);
  const [isLoadMore, setLoadMore] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    owner_id: props.uid || null,
  });

  useEffect(() => {
    _index(isLoadMore);
  }, [query]);

  useEffect(() => {
    if (isLoadMore) {
      setQuery({
        ...query,
        page: query.page + 1,
      });
    }
  }, [isLoadMore]);

  const _handleLoadMore = () => {
    if (list.current_page < list.last_page) {
      setLoadMore(true);
    }
  };

  const _handleScroll = (event) => {
    let scrollTop =
      event.srcElement.scrollHeight -
      (event.srcElement.offsetHeight + event.srcElement.scrollTop);
    if (scrollTop < process.env.REACT_APP_SCROLL_HEIGHT) {
      if (!isLoadMore && _handleLoadMore());
    }
  };

  useEffect(() => {
    document.getElementById('scroll').addEventListener('scroll', _handleScroll);
    return () =>
      document
        .getElementById('scroll')
        .removeEventListener('scroll', _handleScroll);
  });

  const _index = (loadMore) => {
    dispatch(vehicles(query, loadMore)).then((res) => {
      setLoading(false);
      setLoadMore(false);
    });
  };

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
            Veiculos
          </Typography>
        </Toolbar>
      </AppBar>

      <div id="scroll" className="scroll">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            {' '}
            <CircularProgress />{' '}
          </div>
        ) : (
          <>
            {list.data.length > 0 && (
              <div className="card-body">
                <h6 className="m-0">
                  {list.total}{' '}
                  {list.total > 1
                    ? 'veiculos encontrados'
                    : 'veiculo encontrado'}
                </h6>
              </div>
            )}

            {list.data.length < 1 && (
              <div className="text-center mt-5 mb-5 pt-5 pb-5">
                <FcOpenedFolder size="70" />
                <h6 className="mt-4 text-muted">Nenhum veiculo encontrado</h6>
              </div>
            )}

            {list.data.map((item, index) => (
              <Fragment key={index}>
                <div className="card-body d-flex">
                  <div className="vehicle-img d-flex justify-content-center align-items-center">
                    {item.cover && (
                      <img
                        alt=""
                        className="shadow rounded"
                        src={
                          baseURL +
                          'thumb/vehicles/' +
                          item.cover.img +
                          '?u=' +
                          item.cover.user_id +
                          '&s=' +
                          item.cover.vehicle_id +
                          '&w=180&h=135'
                        }
                      />
                    )}
                  </div>

                  <div className="vehicle-detail pl-3 pl-md-4">
                    <h6>
                      {item.vehicle_brand.label} {item.vehicle_model.label}
                    </h6>
                    <strong className="d-block">
                      {item.vehicle_version.label}
                    </strong>
                    {item.vehicle_price && (
                      <strong className="text-danger h5 d-block">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.vehicle_price)}
                      </strong>
                    )}
                    <button className="btn btn-light mt-2">Visualizar</button>
                  </div>
                </div>
                <Divider />
              </Fragment>
            ))}

            {isLoadMore && (
              <div className="text-center card-body">
                <CircularProgress />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OwnerVehicles;
