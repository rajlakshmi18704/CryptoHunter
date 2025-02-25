import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
  } from "@mui/material";
  import AuthModal from "./Authentication/AuthModal";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import { useNavigate } from "react-router-dom";
  import { CryptoState } from "../CryptoContext";
  
  // Define theme
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark", // 'mode' replaces 'type' in MUI v5
    },
    typography: {
      fontFamily: "Montserrat, sans-serif", // Apply globally
    },
  });
  
  function Header() {
    const { currency, setCurrency,user } = CryptoState();
    const navigate = useNavigate();
  
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
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
              <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 85, height: 40 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
  
  export default Header;
  