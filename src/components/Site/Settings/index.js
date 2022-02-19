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
  return <h1>Settings</h1>;
};

export default Settings;
