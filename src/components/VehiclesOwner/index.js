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

import { toggleScreen1 } from '../../store/actions/navigation';

import {
  indexResponse,
  update,
  updateResponse,
} from '../../store/actions/vehicles';

const VehiclesOwner = ({ item = {}, onClose }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    isDeleted: null,
    confirmEl: null,
  });

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

  return (
    <div className="dialog">
      <DialogTitle>Proprietário</DialogTitle>
      <List className="pb-3">
        {item.vehicle_owner && (
          <ListItem button>
            <ListItemAvatar>
              <Avatar className="account-avatar">
                <MdPerson />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className="pb-3 pt-3 m-0"
              primary={item.vehicle_owner.name}
            />
            {state.isDeleted === item.vehicle_owner.id ? (
              <CircularProgress className="mr-2" color="secondary" />
            ) : (
              <IconButton
                onClick={() => setState({ confirmEl: item.vehicle_owner.id })}
                className="ml-auto"
              >
                <MdDelete />
              </IconButton>
            )}

            {state.confirmEl && (
              <Confirm
                open={item.vehicle_owner.id === state.confirmEl}
                onConfirm={() => handleUpdate(null, null)}
                onClose={() => setState({ confirmEl: null })}
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
