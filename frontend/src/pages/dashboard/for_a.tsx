import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material/styles";

import { Box } from "@mui/material";

const For_a = ({ kpis }) => {
  const theme = useTheme();
  return (
    <>
      <Box width="100%" height="100%" position="relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={kpis}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={true}
              tick={{ fontSize: 10 }} // Reduced font size
              dy={5} // Adjust label position
            />
            <YAxis hide={true} tickLine={true} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={false} // Removed dots for cleaner look
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={false} // Removed dots for cleaner look
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default For_a;
