import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./scenes/navbar";



function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
        {/* <BrowserRouter> */}
        {/* <Routes> */}
        {/* <Route path="/" element={}> </Route>   */}
        {/* <Route path="/predictions" element={}> </Route>  */}
        <ThemeProvider theme={theme}>
        <CssBaseline>
          <Navbar></Navbar>
        </CssBaseline>
        </ThemeProvider>
        
        {/* </Routes>
      </BrowserRouter> */}
    </div>
  )
}

export default App
