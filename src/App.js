import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import Routes from './routes';

import Alert from './components/Alert';
import Notify from './components/Notify';
import Loading from './components/Loading';
import Navigation from './components/Navigation';

import { store } from './store/store';

import themeUiConfig from './styles/themeUiConfig';

import './styles/global.css';

const theme = createMuiTheme(themeUiConfig);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Loading />
        <Notify />
        <Alert />
        <Navigation />

        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
