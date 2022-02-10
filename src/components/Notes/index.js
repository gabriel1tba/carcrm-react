import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { MdKeyboardBackspace } from 'react-icons/md';
import { FcOpenedFolder } from 'react-icons/fc';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CircularProgress,
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

  const handleDispatchindex = useCallback(
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
    handleDispatchindex(isLoadMore);
  }, [handleDispatchindex, isLoadMore, query]);

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
          </>
        )}
      </div>
    </>
  );
}
