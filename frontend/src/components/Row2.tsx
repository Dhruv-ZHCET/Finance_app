import { DashboardCard } from "./DashboardCard";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { BoxHeader } from "./BoxHeader";
import { themeSettings } from "../theme";
import getKpi from "../state/get_kpi";
import getProducts from "../state/get_product";
import FlexBetween from "./flexbetween";
import { Box, Typography } from "@mui/material";
import { Statement1 } from "../App";

const PieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

export interface Product {
  id: string;
  Price: string;
  Expense: string;
  transactions: Transaction[];
}

interface Transaction {
  Pr_id: string;
  Tr_id: string;
}

export const Row2 = () => {
  const pieColors = [
    themeSettings.palette.primary[800],
    themeSettings.palette.primary[300],
  ];

  const [data, setData] = useState<
    { name: string; operational: number; nonOperational: number }[]
  >([]);
  const [data2, setData2] = useState<{ Price: number; Expense: number }[]>([]);
  const [loading1, setloading1] = useState(true);
  const [loading2, setloading2] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getKpi();
      if (response.length > 0) {
        const monthlyExpenses = response[0].monthlyExpenses;
        const Data = monthlyExpenses.map((month: Statement1) => ({
          name: month.month.substring(0, 3),
          operational: parseFloat(month.operationalExpenses.replace("$", "")),
          nonOperational: parseFloat(
            month.nonOperationalExpenses.replace("$", "")
          ),
        }));
        setData(Data);
        setloading1(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      if (response.length > 0) {
        const Data = response.map((each: Product) => ({
          price: parseFloat(each.Price.replace("$", "")),
          expense: parseFloat(each.Expense.replace("$", "")),
        }));
        setData2(Data);
        setloading2(false);
        console.log(data2);
      }
    };
    fetchData();
  }, [data2]);

  return (
    <>
      <DashboardCard gridArea="d">
        {loading1 ? (
          <div className="flex justify-center items-center h-full">
            <button
              type="button"
              className="pointer-events-none inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              disabled
            >
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
              <span>Loading...</span>
            </button>
          </div>
        ) : (
          <>
            <BoxHeader
              title="Operational v/s Non-operational Expenses"
              extra="+4%"
            />
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: -10,
                  bottom: 55,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke={themeSettings.palette.grey[800]}
                />
                <XAxis dataKey="name" interval={0} fontSize={"10px"} />
                <YAxis
                  yAxisId="left"
                  fontSize={"10px"}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  fontSize={"10px"}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 11000]}
                />
                <Tooltip />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="operational"
                  stroke={themeSettings.palette.tertiary[500]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="nonOperational"
                  stroke={themeSettings.palette.primary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </DashboardCard>
      <DashboardCard gridArea="e">
        <BoxHeader title="Campaigns & Targets" extra="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 20,
            }}
          >
            <Pie
              stroke="none"
              data={PieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {PieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box flexBasis="40%" textAlign="center" mb="1rem">
            <Typography variant="h5">Target Sales</Typography>
            <Typography variant="h3" color={themeSettings.palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%" mb="1rem">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardCard>
      <DashboardCard gridArea="f">
        {loading2 ? (
          <div className="flex justify-center items-center h-full">
            <button
              type="button"
              className="pointer-events-none inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              disabled
            >
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
              <span>Loading...</span>
            </button>
          </div>
        ) : (
          <>
            <BoxHeader
              title="Product Prices v/s Expenses"
              extra="+4%"
            ></BoxHeader>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 0,
                  right: 25,
                  bottom: 40,
                  left: -10,
                }}
              >
                <CartesianGrid stroke={themeSettings.palette.grey[800]} />
                <XAxis
                  type="number"
                  dataKey="price"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "10px" }}
                  tickFormatter={(v) => `$${v}`}
                  name="Price"
                />
                <YAxis
                  type="number"
                  dataKey="expense"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "10px" }}
                  tickFormatter={(v) => `$${v}`}
                  name="Expense"
                />
                <ZAxis type="number" range={[20]} />
                <Tooltip formatter={(v) => `$${v}`} />
                <Scatter
                  name="Product Expense Ratio"
                  data={data2}
                  fill={themeSettings.palette.tertiary[500]}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </>
        )}
      </DashboardCard>
    </>
  );
};
