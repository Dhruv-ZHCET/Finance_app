import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { themeSettings } from "./theme";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useFetcher,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Dashboard } from "./pages/dashboard";
import Predictions from "./pages/predictions";
import axios from "axios";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const [kpis, setKpis] = useState([]);
  const [kpis1, setKpis1] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend.dhruv-legend2004.workers.dev/kpi"
        );
        console.log("response", response);
        const res = response.data[0].monthlyExpenses;
        const res1 = res.map((obj: any) => ({
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
        const res11 = response.data[0].expenses_by_category[0];
        delete res11.id;
        delete res11.statement_id;
        console.log("res11", res11);
        // const res32 = response[0].expenses_by_category;

        // const res33 = res32.map((obj: any) => ({
        //   Salaries: parseFloat(obj.Salaries.replace("$", "")),
        //   Supplies: parseFloat(obj.Supplies.replace("$", "")),
        //   Services: parseFloat(obj.Services.replace("$", "")),
        // }));

        console.log(res1);
        setKpis1(res11);
        setKpis(res1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("kpi1", kpis1);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />;
        <BrowserRouter>
          <AppContent kpis={kpis} kpis1={kpis1} />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
//for conditionally rendering navbar when not on signup/signin/landing page
const AppContent = ({ kpis, kpis1 }: any) => {
  const location = useLocation();
  const [shownavbar, setshownavbar] = useState(true);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setshownavbar(false);
    } else if (location.pathname === "/signin") {
      setshownavbar(false);
    } else if (location.pathname === "/") {
      setshownavbar(false);
    } else {
      setshownavbar(true);
    }
  }, [location]);

  return (
    <>
      {shownavbar ? <Navbar /> : null}

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard kpis1={kpis1} />} />
        <Route path="/prediction" element={<Predictions kpis={kpis} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
};

export default App;
