import MainContainer from "./Containers/MainContainer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import useConfiguration from "./hooks/use-configuration";


const App = () => {
  const currentTheme = useSelector(state => state.currentTheme);
  const loadingSpinner = useConfiguration();

  const theme = {
    palette: {
      mode: currentTheme,
    },
  };

  return loadingSpinner ? <p>Loading...</p> : (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <MainContainer />
    </ThemeProvider>
  );
};

export default App;