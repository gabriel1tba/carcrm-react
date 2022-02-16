/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useRef,
  Fragment,
} from 'react';
import { MdKeyboardBackspace, MdMoreHoriz, MdPersonAdd } from 'react-icons/md';
import { FcOpenedFolder } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaCar,
  FaClipboard,
  FaPencilAlt,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import {
  AppBar,
  Fab,
  IconButton,
  Toolbar,
  Typography,
  Slide,
  Fade,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core';

import Confirm from '../Confirm';

import { index, destroy } from '../../store/actions/owners';

import {
  toggleScreen1,
  toggleScreen2,
  toggleScreen3,
} from '../../store/actions/navigation';

const Owners = (props) => {
  const dispatch = useDispatch();
  const owners = useSelector((state) => state.ownersReducer.owners);
  const vehicle_id = props.props.vehicle_id || null;

  const noteDivElement = useRef(null);

  const [confirmOwnerEl, setConfirmOwnerEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setLoadMore] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
  });

  const [isDeleted, setIsDeleted] = useState(null);
  const [menuEl, setMenuEl] = useState(null);
  const [confirmEl, setConfirmEl] = useState(null);

  const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleLoadMore = () => {
    if (owners.current_page < owners.last_page) {
      setLoadMore(true);
    }
  };

  const handleScroll = (event) => {
    let scrollTop =
      event.target.scrollHeight -
      (event.target.offsetHeight + event.target.scrollTop);
    if (scrollTop < process.env.REACT_APP_SCROLL_HEIGHT) {
      if (!isLoadMore && handleLoadMore());
    }
  };

  useEffect(() => {
    const currentELement = noteDivElement.current;

    noteDivElement.current.addEventListener('scroll', handleScroll);

    return () => currentELement.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    if (isLoadMore) {
      setQuery({
        ...query,
        page: query.page + 1,
      });
    }
  }, [isLoadMore]);

  const handleToggleMenu = (event) => {
    setMenuEl(event.currentTarget);
  };

  const handleDispatchIndex = useCallback(
    async (loadMore) => {
      try {
        await dispatch(index(query, loadMore));

        setIsLoading(false);
        setLoadMore(false);
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, query]
  );

  useEffect(() => {
    handleDispatchIndex(isLoadMore);
  }, [query]);

  const handleCreate = () => {
    dispatch(
      toggleScreen2({
        open: true,
        type: 'owner-edit',
        props: {},
      })
    );
  };

  const handleShow = (item) => {
    setMenuEl(null);
    dispatch(
      toggleScreen2({
        open: true,
        type: 'owner-show',
        props: {
          item: item,
        },
      })
    );
  };

  const handleEdit = (id) => {
    setMenuEl(null);
    dispatch(
      toggleScreen2({
        open: true,
        type: 'owner-edit',
        props: {
          uid: id,
        },
      })
    );
  };

  const handleDestroy = (id) => {
    setIsDeleted(id);
    setMenuEl(null);

    dispatch(destroy(id)).then((res) => res && setIsDeleted(null));
  };

  const handleToggleNotes = (id) => {
    setMenuEl(null);
    dispatch(
      toggleScreen3({
        open: true,
        type: 'notes',
        props: {
          type: 'owners',
          uid: id,
        },
      })
    );
  };

  const handleVehicles = (owner_id) => {
    setMenuEl(null);
    dispatch(
      toggleScreen2({
        open: true,
        type: 'owner-vehicles',
        props: {
          uid: owner_id,
        },
      })
    );
  };

  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            onClick={() => dispatch(toggleScreen1({ open: false }))}
            edge="start"
            color="inherit"
          >
            <MdKeyboardBackspace />
          </IconButton>

          <Typography variant="h6" color="inherit">
            Proprietários
          </Typography>
        </Toolbar>
      </AppBar>

      <div ref={noteDivElement} className="scroll">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            <CircularProgress />
          </div>
        ) : (
          <>
            {owners.data.length > 0 && (
              <div className="card-body">
                <h6 className="m-0">
                  {owners.total}
                  {owners.total > 1
                    ? 'proprietários encontrados'
                    : 'proprietário encontrado'}
                </h6>
              </div>
            )}

            {owners.data.length < 1 && (
              <div className="text-center mt-5 mb-5 pt-5 pb-5">
                <FcOpenedFolder size="70" />
                <h6 className="mt-4 text-muted">
                  Nenhum proprietário encontrado
                </h6>
              </div>
            )}

            <List>
              {owners.data.map((item, index) => (
                <Fragment key={index}>
                  <ListItem button selected={isDeleted === item.id}>
                    <ListItemAvatar onClick={() => handleShow(item)}>
                      <Avatar className="bg-primary">{item.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      onClick={() => handleShow(item)}
                      className="pb-3 pt-3"
                      primary={item.name}
                    />

                    {isDeleted === item.id && (
                      <CircularProgress className="mr-2" color="secondary" />
                    )}
                    {vehicle_id && (
                      <IconButton onClick={() => setConfirmOwnerEl(item.id)}>
                        <MdPersonAdd />
                      </IconButton>
                    )}

                    {confirmOwnerEl && (
                      <Confirm
                        open={item.id === confirmOwnerEl}
                        onConfirm={() => {
                          props.props.onSelected(item);
                          dispatch(toggleScreen1({ open: false }));
                        }}
                        onClose={() => setConfirmOwnerEl(null)}
                        title="Deseja adicionar esse proprietário ao veiculo ?"
                      />
                    )}

                    {!isDeleted && !vehicle_id && (
                      <>
                        <IconButton id={index} onClick={handleToggleMenu}>
                          <MdMoreHoriz />
                        </IconButton>
                        {Boolean(menuEl) && (
                          <Menu
                            anchorEl={menuEl}
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
                            <MenuItem
                              onClick={() => handleToggleNotes(item.id)}
                            >
                              <FaClipboard size="1.2em" className="mr-4" />
                              Notas
                            </MenuItem>
                            <MenuItem onClick={() => handleVehicles(item.id)}>
                              <FaCar size="1.2em" className="mr-4" /> Veiculos
                            </MenuItem>

                            <Divider />

                            <MenuItem onClick={() => handleEdit(item.id)}>
                              <FaPencilAlt size="1.2em" className="mr-4" />
                              Editar
                            </MenuItem>

                            <MenuItem onClick={() => setConfirmEl(item.id)}>
                              <FaTrash size="1.2em" className="mr-4" /> Apagar
                            </MenuItem>
                          </Menu>
                        )}
                        {confirmEl && (
                          <Confirm
                            open={item.id === confirmEl}
                            onConfirm={() => handleDestroy(item.id)}
                            onClose={() => setConfirmEl(null)}
                          />
                        )}
                      </>
                    )}
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
            </List>
          </>
        )}
        <Fab
          onClick={handleCreate}
          className="fab-bottom-right mr-3 mb-3"
          color="primary"
        >
          <FaPlus />
        </Fab>
      </div>
    </>
  );
};

export default Owners;
