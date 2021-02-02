// Dependencies
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

// Material-UI Theme Config
import themeUiConfig from './styles/themeUiConfig';
const theme = createMuiTheme(themeUiConfig);

// Component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Olá</h1>
    </ThemeProvider>
  );
}

// Export module
export default App;
