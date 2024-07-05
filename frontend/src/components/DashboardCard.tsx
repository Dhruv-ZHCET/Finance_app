import { Box, styled } from "@mui/material";

export const DashboardCard= styled(Box)(({ theme }) => ({
    backgroundColor:theme.palette.background.light,
    borderRadius: "1rem",
    boxShadow:"0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,0.8)"
  }));


