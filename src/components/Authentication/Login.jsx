
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { CryptoState } from "../../CryptoContext";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";
import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = CryptoState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user); // Update user context
      console.log("User logged in Successfully");

      navigate("/");
      toast.success("User logged in Successfully", { position: "top-center" });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#121212", // Dark background
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          backgroundColor: "#1E1E1E", // Dark theme
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "white", backgroundColor: "#333", borderRadius: 5 },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "white", backgroundColor: "#333", borderRadius: 5 },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FFC107",
              "&:hover": { backgroundColor: "#FFA000" },
              color: "black",
            }}
          >
            Login
          </Button>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="body2">
              New user?{" "}
              <Link href="/Signup" underline="hover" sx={{ color: "#FFC107" }}>
                Join Now
              </Link>
            </Typography>
          </Box>
          <SignInwithGoogle />
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;


