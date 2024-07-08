import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { themeSettings } from "./theme";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Dashboard } from "./pages/dashboard";
import Predictions from "./pages/predictions";
import axios from "axios";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { BACKEND_URL } from "./config";

export interface Statement {
  id: number;
  statementId: number;
  month: string;
  expenses: number;
  operationalExpenses: number;
  nonOperationalExpenses: number;
  revenue: number;
}
export interface Statement1 {
  id: number;
  statementId: number;
  month: string;
  expenses: string;
  operationalExpenses: string;
  nonOperationalExpenses: string;
  revenue: string;
}

export interface ExpenseBreakdown {
  Salaries: string;
  Supplies: string;
  Services: string;
}

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const [kpis, setKpis] = useState<Statement[]>([]);
  const [kpis1, setKpis1] = useState<ExpenseBreakdown>({
    Salaries: "",
    Supplies: "",
    Services: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/kpi`);
        console.log("response", response);
        const res = response.data[0].monthlyExpenses;
        const res1 = res.map((obj: Statement1) => ({
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

        console.log(res1);
        setKpis1(res11);
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
          <AppContent kpis={kpis} kpis1={kpis1} />
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}
//for conditionally rendering navbar when not on signup/signin/landing page
const AppContent = ({
  kpis,
  kpis1,
}: {
  kpis: Statement[]; // <--- changed from Statement to Statement[]
  kpis1: ExpenseBreakdown;
}) => {
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
