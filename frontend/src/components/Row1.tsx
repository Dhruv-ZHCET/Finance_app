import { DashboardCard } from "./DashboardCard";
import {
  ResponsiveContainer,
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
} from "recharts";
import { useEffect, useState } from "react";
import { themeSettings } from "../theme";
import { BoxHeader } from "./BoxHeader";
import getKpi from "../state/get_kpi";

export const Row1 = () => {
  // fetching data remotely
  const [data, setData] = useState<
    { name: string; revenue: number; expenses: number; profit: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getKpi();
      if (response.length > 0) {
        const monthlyExpenses = response[0].monthlyExpenses;
        const Data = monthlyExpenses.map((month: any) => ({
          name: month.month.substring(0, 3),
          revenue: parseFloat(month.revenue.replace("$", "")),
          expenses: parseFloat(month.expenses.replace("$", "")),
          profit:
            parseFloat(month.revenue.replace("$", "")) -
            parseFloat(month.expenses.replace("$", "")),
        }));
        setData(Data);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DashboardCard gridArea="a">
        {loading ? (
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
              title="Revenue & Expenses"
              subtitle="top line represents revenue, bottom line refers expenses"
              extra="+4%"
            ></BoxHeader>
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
                  <linearGradient
                    id="colorExpenses"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
          </>
        )}
      </DashboardCard>
      <DashboardCard gridArea="b">
        {loading ? (
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
              title="Profit and Revenue"
              subtitle="top line represents revenue, bottom line refers profit"
              extra="+4%"
            />
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 20,
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
                />
                <Tooltip />
                <Legend
                  height={20}
                  wrapperStyle={{
                    margin: "0 0 10px 0",
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="profit"
                  stroke={themeSettings.palette.tertiary[500]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke={themeSettings.palette.primary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </DashboardCard>
      <DashboardCard gridArea="c">
        {loading ? (
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
              title="Revenue Month by Month"
              subtitle="graph representing the revenue month by month"
              extra="+4%"
            />
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 17,
                  right: 15,
                  left: -5,
                  bottom: 58,
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={themeSettings.palette.primary[300]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={themeSettings.palette.primary[300]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke={themeSettings.palette.grey[800]}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                  interval={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                />
                <Tooltip />
                <Bar dataKey="revenue" fill="url(#colorRevenue)" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </DashboardCard>
    </>
  );
};
