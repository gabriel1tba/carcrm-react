import { MdKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import {
  AppBar,
  Fab,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { toggleScreen1, toggleScreen2 } from '../../store/actions/navigation';

const Owners = () => {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(
      toggleScreen2({
        open: true,
        type: 'owner-edit',
        props: {},
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

      <div id="scroll" className="scroll">
        <Fab
          onClick={handleCreate}
          className="fab-bottom-right mr-3 mb-3"
          color="primary"
        >
          <FaPlus size={17} />
        </Fab>
      </div>
    </>
  );
};

export default Owners;
