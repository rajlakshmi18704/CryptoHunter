import { Button, LinearProgress, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, setAlert, watchlist } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  const inWatchlist = watchlist ? watchlist.includes(coin?.id) : false;

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
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
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
        gap: 2,
        padding: 3,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: { md: "2px solid grey" },
          padding: 2,
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: "justify", px: 2 }}>
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>

        <Box sx={{ width: "100%", mt: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Rank:{" "}
            <span style={{ fontWeight: "normal" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </span>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
            Current Price:{" "}
            <span style={{ fontWeight: "normal" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </span>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
            Market Cap:{" "}
            <span style={{ fontWeight: "normal" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </span>
          </Typography>

          {user && (
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: 40,
                mt: 2,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                color: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: inWatchlist ? "#d00000" : "#d4a217" },
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </Box>
      </Box>

      {/* Coin Info */}
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
