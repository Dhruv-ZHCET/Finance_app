import { useTheme } from "@emotion/react";
import { useMemo, useState } from "react";
import { DashboardCard } from "../components/DashboardCard";
import FlexBetween from "../components/flexbetween";
import { Typography } from "@mui/material";
import { Box, Button } from "@mui/material";
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
  Rectangle,
  Label,
} from "recharts";
import { themeSettings } from "../theme";
import regression, { DataPoint } from "regression";

const Predictions = ({ kpis }) => {
  const [isPrediction, setisPrediction] = useState(false);

  const formattedData = useMemo(() => {
    if (!kpis) return [];
    const monthData = kpis;

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpis]);

  return (
    <>
      <DashboardCard width="100%" height="100%" p="1rem" overflow="hidden">
        <FlexBetween m="1rem 2.5rem" gap="1rem">
          <Box>
            <Typography variant="h3">Revenue and Predictions</Typography>
            <Typography variant="h6">
              charted revenue and predicted revenue based on a simple linear
              regression model
            </Typography>
          </Box>
          <Button
            onClick={() => setisPrediction(!isPrediction)}
            sx={{
              color: themeSettings.palette.grey[900],
              backgroundColor: themeSettings.palette.grey[700],
              boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
            }}
          >
            Show Predicted Revenue for Next Year
          </Button>
        </FlexBetween>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <XAxis dataKey="month" interval={0} fontSize={"10px"}>
              <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>

            <YAxis
              fontSize={"10px"}
              tickLine={false}
              axisLine={false}
              domain={[12000, 26000]}
            >
              <Label
                value="Revenue in USD"
                angle={-90}
                offset={-5}
                position="insideLeft"
              />
            </YAxis>

            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={themeSettings.palette.primary.main}
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#8884d8"
              dot={false}
            />
            {isPrediction && (
              <Line
                strokeDasharray="5 5"
                dataKey="Predicted Revenue"
                stroke={themeSettings.palette.secondary[500]}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
    </>
  );
};

export default Predictions;