import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes/routes';

import themeUiConfig from './styles/themeUiConfig';
const theme = createMuiTheme(themeUiConfig);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
