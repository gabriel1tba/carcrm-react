/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useRef,
  Fragment,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { zonedTimeToUtc } from 'date-fns-tz';
import { FcOpenedFolder } from 'react-icons/fc';
import { FaEllipsisV, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { MdKeyboardBackspace, MdClose, MdSave, MdSend } from 'react-icons/md';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CircularProgress,
  TextField,
  Avatar,
  Menu,
  MenuItem,
  Slide,
  Fade,
} from '@material-ui/core';

import {
  index,
  store,
  update,
  destroy,
  change,
} from '../../store/actions/notes';

import Confirm from '../../components/Confirm';

import { toggleScreen3 } from '../../store/actions/navigation';

export default function Notes({ uid, type, props }) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notesReducer.notes);
  const note = useSelector((state) => state.notesReducer.note);
  const theme = useTheme();

  const noteDivElement = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setLoadMore] = useState(false);
  const [query, setQuery] = useState({
    uid: uid ? uid : null,
    type: type ? type : null,
    page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(null);
  const [isEdited, setIsEdited] = useState(null);
  const [menuEl, setMenuEl] = useState(null);
  const [confirmEl, setConfirmEl] = useState(null);

  const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleLoadMore = () => {
    if (notes.current_page < notes.last_page) {
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

  const handleDispatchStore = async () => {
    setLoading(true);

    const data = {
      uid: query.uid,
      type: query.type,
    };

    try {
      const response = await dispatch(store({ ...data, ...note }));

      if (response) {
        dispatch(change('clear'));

        noteDivElement.current.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDispatchUpdate = async () => {
    setLoading(true);

    try {
      await dispatch(update(note));
      dispatch(change('clear'));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsEdited(null);
    }
  };

  const handleDispatchEdit = (item) => {
    setIsEdited(item.id);
    setMenuEl(null);
    dispatch(change(item));
  };

  const handleDispatchDestroy = async (id) => {
    setIsDeleted(id);
    setMenuEl(null);
    try {
      const response = await dispatch(destroy(id));
      if (response) {
        setIsDeleted(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            onClick={() => dispatch(toggleScreen3({ open: false }))}
            edge="start"
            color="inherit"
          >
            <MdKeyboardBackspace />
          </IconButton>

          <Typography variant="h6" color="inherit">
            Notas
          </Typography>
        </Toolbar>
      </AppBar>

      <div ref={noteDivElement} className="scroll-form notes">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            <CircularProgress />
          </div>
        ) : (
          <>
            {notes.data.length > 0 && (
              <div className="card-body">
                <h6 className="m-0">
                  {notes.total}
                  {notes.total > 1 ? 'notas encontradas' : 'nota encontrada'}
                </h6>
              </div>
            )}

            {notes.data.length < 1 && (
              <div className="text-center mt-5 mb-5 pt-5 pb-5">
                <FcOpenedFolder size="70" />
                <h6 className="mt-4 text-muted">Nenhuma nota encontrada</h6>
              </div>
            )}

            {notes.data.map((item, index) => (
              <Fragment key={index}>
                <div
                  className={
                    isEdited === item.id || isDeleted === item.id
                      ? 'bg-selected'
                      : ''
                  }
                >
                  <div className="card-body d-flex align-items-center">
                    <div className="d-none d-md-block">
                      <Avatar className="bg-primary mr-4">
                        {item.user.name[0]}
                      </Avatar>
                    </div>

                    <div>
                      <div className="alert alert-secondary mr-4 mb-1">
                        {item.content}
                      </div>
                      <small>
                        {format(
                          zonedTimeToUtc(item.updated_at, 'America/Sao_Paulo'),
                          "'Dia' dd 'de' MMMM ', às ' HH:mm'h'",
                          { locale: pt }
                        )}
                        por {item.user.name}
                      </small>
                    </div>

                    <div className="ml-auto">
                      {isDeleted === item.id ? (
                        <CircularProgress className="mr-2" color="secondary" />
                      ) : (
                        <>
                          <IconButton id={index} onClick={handleToggleMenu}>
                            <FaEllipsisV />
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
                                onClick={() => handleDispatchEdit(item)}
                              >
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
                              onConfirm={() => handleDispatchDestroy(item.id)}
                              onClose={() => setConfirmEl(null)}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="m-0" />
              </Fragment>
            ))}

            {isLoadMore && (
              <div className="text-center card-body">
                <CircularProgress />
              </div>
            )}

            <div className="form">
              <TextField
                autoFocus
                multiline
                placeholder="Digite uma nota"
                value={note.content || ''}
                onChange={(event) =>
                  dispatch(change({ content: event.target.value }))
                }
              />
              <div className="send">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    {isEdited ? (
                      <>
                        <IconButton
                          onClick={() => {
                            dispatch(change('clear'));
                            setIsEdited(null);
                          }}
                        >
                          <MdClose />
                        </IconButton>
                        <IconButton
                          onClick={() => note.content && handleDispatchUpdate()}
                        >
                          <MdSave
                            color={note.content && theme.palette.primary.main}
                          />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        onClick={() => note.content && handleDispatchStore()}
                      >
                        <MdSend
                          color={note.content && theme.palette.primary.main}
                        />
                      </IconButton>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
