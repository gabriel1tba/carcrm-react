import { MdKeyboardBackspace } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { toggleScreen1 } from '../../../store/actions/navigation';
import { change, update } from '../../../store/actions/app';

const Seo = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.appReducer.app);

  console.log(app);

  const handleUpdate = async () => {
    try {
      await dispatch(update(app));

      dispatch(toggleScreen1({ open: false }));
    } catch (error) {
      console.log(error);
    }
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
            Otimização Google
          </Typography>

          <Button
            onClick={() => handleUpdate()}
            color="inherit"
            className="ml-auto"
          >
            <FaSave className="mr-2" /> Salvar
          </Button>
        </Toolbar>
      </AppBar>

      <div className="scroll card-body">
        <div className="form-group">
          <label className="label-custom">TITULO DO SITE</label>
          <TextField
            value={app.site_title || ''}
            onChange={(event) =>
              dispatch(change({ site_title: event.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label className="label-custom">PALAVRAS CHAVES</label>
          <TextField
            placeholder="Separe cada palavra por virgula"
            value={app.site_keywords || ''}
            onChange={(event) =>
              dispatch(change({ site_keywords: event.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label className="label-custom">DESCRIÇÃO DO SITE</label>
          <TextField
            multiline
            rows="5"
            value={app.site_description || ''}
            onChange={(event) =>
              dispatch(change({ site_description: event.target.value }))
            }
          />
        </div>
      </div>
    </>
  );
};
export default Seo;
