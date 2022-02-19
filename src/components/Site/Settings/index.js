import { FaSave } from 'react-icons/fa';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import MaskedInput from 'react-text-mask';
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

const TextMaskCustom = ({ inputRef, ...other }) => {
  let mask = [];

  if (other.name === 'phone') {
    mask = [
      '(',
      /[0-9]/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
    if (other.value) {
      if (other.value.length === 15) {
        mask = [
          '(',
          /[0-9]/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ];
      }
    }
  }

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      guide={false}
    />
  );
};

const Settings = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.appReducer.app);

  const handleUpdate = () => {
    dispatch(update(app)).then(() => dispatch(toggleScreen1({ open: false })));
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
            Configurações
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
          <label className="label-custom">EMAIL CONTATO</label>
          <TextField
            value={app.email_contact || ''}
            onChange={(text) =>
              dispatch(change({ email_contact: text.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label className="label-custom">WHATSAPP - INTEGRAÇÃO</label>
          <TextField
            name="phone"
            type="tel"
            autoComplete="off"
            InputProps={{
              inputComponent: TextMaskCustom,
              value: app.whatsapp,
              onChange: (text) =>
                dispatch(change({ whatsapp: text.target.value })),
            }}
          />
        </div>

        <div className="form-group">
          <label className="label-custom">
            ID PÁGINA FACEBOOK - INTEGRAÇÃO
          </label>
          <TextField
            value={app.facebook_page_id || ''}
            onChange={(text) =>
              dispatch(change({ facebook_page_id: text.target.value }))
            }
          />
          <a
            href="https://findmyfbid.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong className="text-danger d-block mt-1">
              Não sei o ID da minha página ?
            </strong>
          </a>
        </div>

        <div className="form-group">
          <label className="label-custom">GOOGLE ANALYTICS</label>
          <TextField
            placeholder="Ex: UA-145797887-1"
            value={app.google_analytics || ''}
            onChange={(text) =>
              dispatch(change({ google_analytics: text.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label className="label-custom">PIXEL FACEBOOK</label>
          <TextField
            multiline
            rows="3"
            value={app.facebook_pixel || ''}
            onChange={(text) =>
              dispatch(change({ facebook_pixel: text.target.value }))
            }
          />
        </div>
      </div>
    </>
  );
};

export default Settings;
