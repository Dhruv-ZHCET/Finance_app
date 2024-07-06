import axios from "axios";
import { DashboardCard } from "./DashboardCard";
import { error } from "console";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Area,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { BoxHeader } from "./BoxHeader";
import { themeSettings } from "../theme";
import getKpi from "../state/get_kpi";
import getProducts from "../state/get_product";

export const Row2 = () => {
  const theme = useTheme();
  const [data, setData] = useState<
    { name: string; operational: number; nonOperational: number }[]
  >([]);
  const [data2, setData2] = useState<{ Price: number; Expense: number }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getKpi();
      if (response.length > 0) {
        const monthlyExpenses = response[0].monthlyExpenses;
        const Data = monthlyExpenses.map((month: any) => ({
          name: month.month.substring(0, 3),
          operational: parseFloat(month.operationalExpenses.replace("$", "")),
          nonOperational: parseFloat(
            month.nonOperationalExpenses.replace("$", "")
          ),
        }));
        setData(Data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      if (response.length > 0) {
        const Data = response.map((each: any) => ({
          price: parseFloat(each.Price.replace("$", "")),
          expense: parseFloat(each.Expense.replace("$", "")),
        }));
        setData2(Data);
        console.log(data2);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <DashboardCard gridArea="d">
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
      </DashboardCard>
      <DashboardCard gridArea="e">Hello</DashboardCard>
      <DashboardCard gridArea="f">
        <BoxHeader title="Product Prices v/s Expenses" extra="+4%"></BoxHeader>
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
      </DashboardCard>
    </>
  );
};
