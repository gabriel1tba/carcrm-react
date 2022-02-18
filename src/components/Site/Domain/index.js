import { FaSave } from 'react-icons/fa';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';

import {
  change,
  success,
  update,
  validateSubdomain,
} from '../../../store/actions/app';

import { toggleScreen1 } from '../../../store/actions/navigation';

const Domain = () => {
  return <h1>Domain</h1>;
};

export default Domain;
