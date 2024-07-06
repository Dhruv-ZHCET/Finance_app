import { DashboardCard } from "./DashboardCard";
import getProducts from "../state/get_product";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import {
  CartesianGrid,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  LineChart,
  Line,
  Legend,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { themeSettings } from "../theme";
import { BoxHeader } from "./BoxHeader";
import { useDemoData } from "@mui/x-data-grid-generator";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getTransaction from "../state/get_transaction";
import getKpi from "../state/get_kpi";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import FlexBetween from "./flexbetween";

// Create a dark theme

// Define columns
const productColumns = [
  {
    field: "id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "Expense",
    headerName: "Expense ($)",
    flex: 0.5,
  },
  {
    field: "Price",
    headerName: "Price ($)",
    flex: 0.5,
  },
];
const TranactionColumns = [
  {
    field: "id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "Buyer",
    headerName: "Buyer",
    flex: 0.5,
  },
  {
    field: "Amount",
    headerName: "Amount ($)",
    flex: 0.5,
  },
  {
    field: "Count",
    headerName: "Count",
    flex: 0.5,
  },
];
interface ExpenseData {
  name: string;
  value: number;
}

export const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const [data, setData] = useState<
    { name: string; revenue: number; expenses: number; profit: number }[]
  >([]);
  const [data1, setData1] = useState<
    { name: string; revenue: number; expenses: number; profit: number }[]
  >([]);

  const [salaryData, setSalaryData] = useState<ExpenseData[]>([]);
  const [supplyData, setSupplyData] = useState<ExpenseData[]>([]);
  const [serviceData, setServiceData] = useState<ExpenseData[]>([]);
  console.log(salaryData);
  console.log("this is the salary data maadrchod");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      const response1 = await getTransaction();

      const Data = response.map((product: any) => ({
        id: product.id,
        Price: parseFloat(product.Price.replace("$", "")),
        Expense: parseFloat(product.Expense.replace("$", "")),
      }));

      const Data1 = response1.map((transaction: any) => ({
        id: transaction.id,
        Amount: parseFloat(transaction.Amount.replace("$", "")),
        Buyer: transaction.Buyer,
        Count: transaction.Products.length,
      }));

      //   const Data2 = response3[1].expenses_by_category.map((res) => {
      //     const salaries = parseFloat(res.Salaries.replace("$", ""));
      //     const supplies = parseFloat(res.Supplies.replace("$", ""));
      //     const services = parseFloat(res.Services.replace("$", ""));
      //     const total = salaries + supplies + services;

      //     return [
      //       { name: "Salaries", value: (salaries / total) * 100 },
      //       { name: "Supplies", value: (supplies / total) * 100 },
      //       { name: "Services", value: (services / total) * 100 }
      //     ];
      //   });

      setData(Data);
      setData1(Data1);
    };

    fetchData();
  }, []); // Added closing bracket and semicolon here

  useEffect(() => {
    const fetchData = async () => {
      const response = await getKpi();
      const totalExpenses = response[0].totalExpenses;

      const expenses = response[0].expenses_by_category[0];
      console.log(expenses);
      console.log("this is expenses maadrchod please");

      const salaryValue = parseFloat(expenses.Salaries.replace("$", ""));
      const supplyValue = parseFloat(expenses.Supplies.replace("$", ""));
      const serviceValue = parseFloat(expenses.Services.replace("$", ""));
      const totalValue = salaryValue + supplyValue + serviceValue;
      console.log("ma ka bhosda");
      setSalaryData([
        { name: "Salary", value: salaryValue },
        { name: "Other", value: totalValue - salaryValue },
      ]);

      setSupplyData([
        { name: "Supply", value: supplyValue },
        { name: "Other", value: totalValue - supplyValue },
      ]);

      setServiceData([
        { name: "Service", value: serviceValue },
        { name: "Other", value: totalValue - serviceValue },
      ]);
    };

    fetchData();
  }, []);

  return (
    <>
      <DashboardCard gridArea="g">
        <BoxHeader
          title="List of Products"
          subtitle=""
          extra={`${data?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: themeSettings.palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${themeSettings.palette.grey[300]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${themeSettings.palette.grey[300]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={data || []}
            columns={productColumns}
          />
        </Box>
      </DashboardCard>
      <DashboardCard gridArea="h" bgcolor="#fff">
        <BoxHeader
          title="Recent Orders"
          subtitle=""
          extra={`${data?.length} Transactions`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: themeSettings.palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${themeSettings.palette.grey[300]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${themeSettings.palette.grey[300]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={data1 || []}
            columns={TranactionColumns}
          />
        </Box>
      </DashboardCard>
      <DashboardCard gridArea="i" bgcolor="#fff">
        <BoxHeader title="Expense Breakdown By Category" extra="+4%" />
        <FlexBetween
          mt="0.5rem"
          gap="0.5rem"
          p="0 1rem"
          textAlign="center"
        ></FlexBetween>
      </DashboardCard>
      <DashboardCard gridArea="j" bgcolor="#fff">
        Hello
      </DashboardCard>
    </>
  );
};
