import { useState, useEffect, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { zonedTimeToUtc } from 'date-fns-tz';
import { FcOpenedFolder } from 'react-icons/fc';
import { MdKeyboardBackspace, MdClose, MdSave, MdSend } from 'react-icons/md';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CircularProgress,
  TextField,
  Avatar,
} from '@material-ui/core';

import {
  index,
  store,
  update,
  destroy,
  change,
} from '../../store/actions/notes';

import { toggleScreen3 } from '../../store/actions/navigation';

export default function Notes({ uid, type, props }) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notesReducer.notes);
  const note = useSelector((state) => state.notesReducer.note);
  const theme = useTheme();

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
  }, [handleDispatchIndex, isLoadMore, query]);

  const handleDispatchStore = async () => {
    setLoading(true);

    const data = {
      uid: query.uid,
      type: query.type,
    };

    try {
      const response = await dispatch(store({ ...data, ...note }));

      debugger;
      if (response) {
        dispatch(change('clear'));

        document.getElementById('scroll').scroll({
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
    setLoading(false);
    dispatch(update(note)).then((res) => {
      setLoading(false);
      setIsEdited(null);
      if (res) {
        dispatch(change('clear'));
      }
    });
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

      <div id="scroll" className="scroll-form notes">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            {' '}
            <CircularProgress />{' '}
          </div>
        ) : (
          <>
            {notes.data.length > 0 && (
              <div className="card-body">
                <h6 className="m-0">
                  {notes.total}{' '}
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
                        {item.user.name.slice(0, 1)}
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
                        )}{' '}
                        por {item.user.name}
                      </small>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}

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
                            color={note.content && theme.palette.secondary.main}
                          />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        onClick={() => note.content && handleDispatchStore()}
                      >
                        <MdSend
                          color={note.content && theme.palette.secondary.main}
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
