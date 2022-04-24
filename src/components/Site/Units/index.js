/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, forwardRef, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardBackspace, MdLocationOn, MdMoreHoriz } from 'react-icons/md';
import { FcOpenedFolder } from 'react-icons/fc';
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import {
  AppBar,
  Avatar,
  CircularProgress,
  Divider,
  Fab,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';

import Confirm from '../../Confirm';

import { destroy, index } from '../../../store/actions/units';

import {
  toggleScreen1,
  toggleScreen2,
} from '../../../store/actions/navigation';

const Units = () => {
  const dispatch = useDispatch();
  const units = useSelector((state) => state.unitsReducer.units);

  const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [isLoading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(null);
  const [menuEl, setMenuEl] = useState(null);
  const [confirmEl, setConfirmEl] = useState(null);

  const handleCreate = () => {
    dispatch(
      toggleScreen2({
        open: true,
        type: 'unit-edit',
        props: {},
      })
    );
  };

  const handleEdit = (id) => {
    setConfirmEl(null);
    dispatch(
      toggleScreen2({
        open: true,
        type: 'unit-edit',
        props: {
          uid: id,
        },
      })
    );
  };

  const handlDestroy = (id) => {
    setConfirmEl(null);
    setIsDeleted(id);
    dispatch(destroy(id)).then((res) => res && setIsDeleted(null));
  };

  const handleMenu = (event) => {
    setMenuEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(index());
    setLoading(false);
  }, []);

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
            Unidades e telefones
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="scroll">
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5 pt-5">
            <CircularProgress />
          </div>
        ) : (
          <>
            {units.length > 0 && (
              <div className="card-body">
                <h6 className="m-0">
                  {units.length}
                  {units.length > 1
                    ? ' unidades encontradas'
                    : ' unidade encontrada'}
                </h6>
              </div>
            )}

            {units.length < 1 && (
              <div className="text-center mt-5 mb-5 pt-5 pb-5">
                <FcOpenedFolder size="70" />
                <h6 className="mt-4 text-muted">Nenhuma unidade encontrada</h6>
              </div>
            )}

            <List>
              {units.map((item, index) => (
                <Fragment key={index}>
                  <ListItem button selected={isDeleted === item.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <MdLocationOn />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className="pb-3 pt-3"
                      primary={item.neighborhood}
                    />

                    {isDeleted === item.id && (
                      <CircularProgress className="mr-2" color="secondary" />
                    )}

                    {!isDeleted && (
                      <div>
                        <IconButton id={index} onClick={handleMenu}>
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
                            onConfirm={() => handlDestroy(item.id)}
                            onClose={() => setMenuEl(null)}
                          />
                        )}
                      </div>
                    )}
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
            </List>
            <Fab
              onClick={() => handleCreate()}
              className="fab-bottom-right mr-3 mb-3"
              color="primary"
            >
              <FaPlus />
            </Fab>
          </>
        )}
      </div>
    </>
  );
};

export default Units;
