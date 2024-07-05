import { Box, useMediaQuery } from "@mui/material";
// import { DashboardCard } from "../../components/DashboardCard";
// import For_a from "./for_a";
import { Row1 } from "../components/Row1";
import { Row3 } from "../components/Row3";
import { Row2 } from "../components/Row2";

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

export const Dashboard = () => {

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
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};
