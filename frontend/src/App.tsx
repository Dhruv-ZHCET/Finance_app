import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { themeSettings } from "./theme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Predictions } from "./pages/predictions";
import axios from "axios";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend.dhruv-legend2004.workers.dev/kpi"
        );

        const res = response.data[0].monthlyExpenses;
        const res1 = res.map((obj) => ({
          ...obj,
          expenses: parseFloat(obj.expenses.replace("$", "")),
          operationalExpenses: parseFloat(
            obj.operationalExpenses.replace("$", "")
          ),
          nonOperationalExpenses: parseFloat(
            obj.nonOperationalExpenses.replace("$", "")
          ),
          revenue: parseFloat(obj.revenue.replace("$", "")),
        }));
        console.log(res1);
        setKpis(res1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard kpis={kpis} />} />
            <Route path="/predictions" element={<Predictions />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
