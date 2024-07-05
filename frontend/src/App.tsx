import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar} from './components/navbar'
import {Dashboard} from "./pages/dashboard"; 
import { Predictions } from "./pages/predictions";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar /> 
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/predictions" element = {<Predictions/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
