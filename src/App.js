import { Provider } from 'react-redux';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './store/store';

import Routes from './routes/routes';

import { Loading, Notify, Alert, Confirm } from './components';

import themeUiConfig from './styles/themeUiConfig';
const theme = createMuiTheme(themeUiConfig);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Loading />
        <Notify />
        <Alert />
        <Confirm
          open={true}
          onClose={() => console.log('close')}
          onConfirm={() => console.log('confirm')}
        />
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
