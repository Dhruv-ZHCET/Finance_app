import { Button, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PixIcon from "@mui/icons-material/Pix";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const { palette } = useTheme();

  console.log(palette.grey[500]);
  const navigate = useNavigate();
  async function dashbordclick() {
    navigate("/dashboard");
  }
  async function predictionclick() {
    navigate("/prediction");
  }

  return (
    <Box
      width="100%"
      my={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        component="span"
        display="flex"
        alignItems="center"
        gap="13px"
        sx={{
          padding: "0.5rem",
          color: palette.grey[500],
        }}
      >
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h3" sx={{ color: palette.grey[200] }}>
          Financeer
        </Typography>
      </Box>
      <Box component="span" sx={{ padding: "0.5rem" }}>
        <Button
          onClick={dashbordclick}
          variant="text"
          sx={{ color: palette.grey[200] }}
        >
          Dashboard
        </Button>
        <Button
          onClick={predictionclick}
          variant="text"
          sx={{ color: palette.grey[200] }}
        >
          Predictions
        </Button>
      </Box>
    </Box>
  );
};
