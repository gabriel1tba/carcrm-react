import { Provider } from 'react-redux';

import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes/routes';

import Alert from './components/Alert';
import Notify from './components/Notify';
import Loading from './components/Loading';

import { store } from './store/store';

import themeUiConfig from './styles/themeUiConfig';
const theme = createMuiTheme(themeUiConfig);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Loading />
        <Notify />
        <Alert />

        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
