import { Box, useMediaQuery } from "@mui/material";
import { DashboardCard } from "../../components/DashboardCard";
import For_a from "./for_a";

const gridParam = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
`;
const gridmallScreen = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"
`;

export const Dashboard = (props) => {
  const kpis = props.kpis;

  console.log(kpis);
  const isAbove = useMediaQuery("(min-width:1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAbove
          ? {
              gridTemplateAreas: gridParam,
              gridTemplateColumns: "repeat(3,minmax(370px,1fr))",
              gridTemplateRows: "repeat(10,minmax(60px,1fr))",
            }
          : {
              gridTemplateAreas: gridmallScreen,
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
            }
      }
    >
      <DashboardCard gridArea="b" bgcolor="#fff">
        Hello
      </DashboardCard>
      <DashboardCard
        sx={{
          marginLeft: "10px",
          padding: "1rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // Add this to prevent content from spilling out
        }}
        gridArea="a"
        bgcolor="#fff"
      >
        <For_a kpis={kpis}></For_a>
      </DashboardCard>
      <DashboardCard sx={{ marginRight: "10px" }} gridArea="c" bgcolor="#fff">
        Hello
      </DashboardCard>
      <DashboardCard sx={{ marginLeft: "10px" }} gridArea="d" bgcolor="#fff">
        Hello
      </DashboardCard>
      <DashboardCard gridArea="e" bgcolor="#fff">
        Hello
      </DashboardCard>
      <DashboardCard sx={{ marginRight: "10px" }} gridArea="f" bgcolor="#fff">
        Hello
      </DashboardCard>
      <DashboardCard sx={{ marginBottom: "10px" }} gridArea="h" bgcolor="#fff">
        Hello
      </DashboardCard>
      <DashboardCard
        sx={{ marginLeft: "10px", marginBottom: "10px" }}
        gridArea="g"
        bgcolor="#fff"
      >
        Hello
      </DashboardCard>
      <DashboardCard sx={{ marginRight: "10px" }} gridArea="i" bgcolor="#fff">
        Hello
      </DashboardCard>
      <DashboardCard
        sx={{ marginRight: "10px", marginBottom: "10px" }}
        gridArea="j"
        bgcolor="#fff"
      >
        Hello
      </DashboardCard>
    </Box>
  );
};
