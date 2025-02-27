
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import UserSidebar from "./Authentication/UserSidebar";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

function Header() {
  const { currency, setCurrency, user } = CryptoState();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            {/* App Name */}
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Crypto Hunter
            </Typography>

            {/* Currency Selector */}
            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{ width: 85, height: 40, marginRight: 2 }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {/* User Profile or Login Button */}
            {user ? (
              <UserSidebar />
            ) : (
              <Button
              variant="contained"
              sx={{ backgroundColor: "#EEBC1D", color: "black", "&:hover": { backgroundColor: "#d4a317" } }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
