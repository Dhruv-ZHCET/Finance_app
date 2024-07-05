import axios from "axios";
import { DashboardCard } from "./DashboardCard";
import { ResponsiveContainer, CartesianGrid, AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { themeSettings } from "../theme";
import { BoxHeader } from "./BoxHeader";


async function getKpi(){
  try {
    const response = await axios.get('https://backend.haqueinsham.workers.dev/kpi');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const Row1 = () => {
  // fetching data remotely
  const [data, setData] = useState<{ name: string; revenue:number; expenses:number }[]>([]);
  const theme = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getKpi();
      if (response.length > 0) {
        const monthlyExpenses = response[0].monthlyExpenses;
        const Data = monthlyExpenses.map((month:any) => ({
          name: month.month.substring(0, 3),
          revenue : parseFloat(month.revenue.replace('$','')),
          expenses : parseFloat(month.expenses.replace('$','')),
        }));
        setData(Data);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DashboardCard gridArea="a">
        {/* <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        /> */}
        <BoxHeader title = "Revenue & Expenses" subtitle="top line represents revenue, bottom line refers expenses" extra="+4%"></BoxHeader>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={themeSettings.palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={themeSettings.palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={themeSettings.palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={themeSettings.palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={themeSettings.palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={themeSettings.palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardCard>
      <DashboardCard gridArea="b">Hello</DashboardCard>
      <DashboardCard gridArea="c">Hello</DashboardCard>
    </>
  );
};
