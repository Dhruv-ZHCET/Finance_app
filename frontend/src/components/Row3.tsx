import { DashboardCard } from "./DashboardCard";
import getProducts from "../state/get_product";
import { Box } from "@mui/material";
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
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { themeSettings } from "../theme";
import { BoxHeader } from "./BoxHeader";
import { useDemoData } from "@mui/x-data-grid-generator";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getTransaction from "../state/get_transaction";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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
    headerName: "Expense",
    flex: 0.5,
  },
  {
    field: "Price",
    headerName: "Price",
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
    headerName: "Amount",
    flex: 0.5,
  },
  {
    field: "Count",
    headerName: "Count",
    flex: 0.5,
  },
];

export const Row3 = () => {
  const pieColors = [themeSettings.palette.primary[800], themeSettings.palette.primary[500]];
  const [data, setData] = useState<
    { name: string; revenue: number; expenses: number; profit: number }[]
  >([]);
  const [data1, setData1] = useState<
    { name: string; revenue: number; expenses: number; profit: number }[]
  >([]);
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

      setData(Data);
      setData1(Data1);
    };

    fetchData();
  }, []); // Added closing bracket and semicolon here

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
      <DashboardCard gridArea="h">
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
        heello
      </DashboardCard>
      <DashboardCard gridArea="j" bgcolor="#fff">
        Hello
      </DashboardCard>
    </>
  );
};
