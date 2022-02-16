import { useState, useEffect } from 'react';
import { MdAdd, MdDelete, MdPerson } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  CircularProgress,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import Confirm from '../Confirm';

import { toggleScreen1, toggleScreen2 } from '../../store/actions/navigation';

import {
  indexResponse,
  update,
  updateResponse,
} from '../../store/actions/vehicles';

const VehiclesOwner = ({ item = {}, onClose }) => {
  const dispatch = useDispatch();

  const [isDeleted] = useState(null);
  const [confirmEl, setConfirmEl] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(indexResponse({ success: false }));
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (owner, id) => {
    dispatch(updateResponse({ ...item, vehicle_owner: owner }));
    dispatch(
      update({
        id: item.id,
        vehicle_owner: id,
        update_owner: true,
      })
    );
  };

  const handleOwners = (vehicle_id) => {
    dispatch(
      toggleScreen1({
        open: true,
        type: 'owners',
        props: {
          vehicle_id: vehicle_id,
          onSelected: (owner) => {
            handleUpdate(owner, owner.id);
          },
        },
      })
    );
  };

  const handleShowOwner = (item) => {
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

  return (
    <div className="dialog">
      <DialogTitle>Proprietário</DialogTitle>
      <List className="pb-3">
        {item.vehicle_owner && (
          <ListItem button>
            <ListItemAvatar onClick={() => handleShowOwner(item.vehicle_owner)}>
              <Avatar className="account-avatar">
                <MdPerson />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              onClick={() => handleShowOwner(item.vehicle_owner)}
              className="pb-3 pt-3 m-0"
              primary={item.vehicle_owner.name}
            />
            {isDeleted === item.vehicle_owner.id ? (
              <CircularProgress className="mr-2" color="secondary" />
            ) : (
              <IconButton
                onClick={() => setConfirmEl(item.vehicle_owner.id)}
                className="ml-auto"
              >
                <MdDelete />
              </IconButton>
            )}

            {confirmEl && (
              <Confirm
                open={item.vehicle_owner.id === confirmEl}
                onConfirm={() => handleUpdate(null, null)}
                onClose={() => setConfirmEl(null)}
              />
            )}
          </ListItem>
        )}
        <ListItem button onClick={() => handleOwners(item.id)}>
          <ListItemAvatar>
            <Avatar>
              <MdAdd />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Adicionar proprietário" />
        </ListItem>
      </List>

      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </div>
  );
};

export default VehiclesOwner;
