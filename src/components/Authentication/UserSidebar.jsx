


import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function UserSidebar() {
  const [state, setState] = useState({ right: false });
  const { user, setAlert, watchlist, coins, symbol } = CryptoState();
  console.log(user, "user");
  console.log("Coins List:", coins);
  console.log("Watchlist:", watchlist);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setState({ ...state, [anchor]: open });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setAlert({
        open: true,
        type: "success",
        message: "Logout Successful!",
      });
      toast.success("User logged out Successfully", { position: "top-center" });
      setState({ right: false }); // Close sidebar on logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      });
      toast.success(`${coin.name} Removed from the Watchlist!`, { position: "top-center" });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* Avatar in Header */}
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              marginLeft: 2,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user?.photoURL || ""}
            alt={user?.displayName || user?.email || "User"}
          >
            {!user?.photoURL && (user?.displayName?.[0] || user?.email?.[0])}
          </Avatar>

          {/* Sidebar Drawer */}
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <Box
              sx={{
                width: 350,
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  height: "92%",
                }}
              >
                {/* Profile Avatar */}
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                    objectFit: "contain",
                  }}
                  src={user?.photoURL || ""}
                  alt={user?.displayName || user?.email || "User"}
                >
                  {!user?.photoURL && (user?.displayName?.[0] || user?.email?.[0])}
                </Avatar>

                <Typography
                  sx={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bold",
                    wordWrap: "break-word",
                  }}
                >
                  {user?.displayName || user?.email}
                </Typography>

                {/* Watchlist Section */}
                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "grey",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                    overflowY: "auto",
                  }}
                >
                  <Typography sx={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </Typography>

                  {coins
                    .filter((coin) => watchlist.includes(coin.id)) // Filter only watched coins
                    .map((coin) => (
                      <Box
                        key={coin.id}
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          color: "black",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#EEBC1D",
                          boxShadow: "0 0 3px black",
                        }}
                      >
                        <Typography>{coin.name}</Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography>
                            {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                          </Typography>
                          <AiFillDelete
                            style={{ cursor: "pointer" }}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>

              {/* Logout Button */}
              <Button
                variant="contained"
                sx={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  mt: 2,
                }}
                onClick={logOut}
              >
                Log Out
              </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
