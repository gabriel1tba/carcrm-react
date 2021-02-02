// Dependencies
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Material-UI Theme Config
import themeConfig from './styles/themeConfig';
const theme = createMuiTheme(themeConfig);

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
