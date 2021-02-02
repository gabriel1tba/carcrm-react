import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import themeUiConfig from './styles/themeUiConfig';
const theme = createMuiTheme(themeUiConfig);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Olá</h1>
    </ThemeProvider>
  );
}

export default App;
