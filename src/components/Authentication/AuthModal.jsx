import { Modal, Backdrop, Fade, Button, Tab, Tabs, AppBar, Box } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../config/firebaseConfig";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const { setAlert } = CryptoState();
  const [value, setValue] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => setValue(newValue);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({ open: true, message: error.message, type: "error" });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: 85,
          height: 40,
          ml: 2,
          backgroundColor: "#EEBC1D",
          "&:hover": { backgroundColor: "#d4a017" },
        }}
        onClick={handleOpen}
      >
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: 400,
              bgcolor: "background.paper",
              color: "black",
              borderRadius: 2,
              p: 2,
            }}
          >
            <AppBar position="static" sx={{ backgroundColor: "transparent", color: "white" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                sx={{ borderRadius: 2 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box sx={{ textAlign: "center", py: 2 }}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none", marginTop: 10 }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
