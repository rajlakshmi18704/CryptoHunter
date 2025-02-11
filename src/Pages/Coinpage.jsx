import { LinearProgress, Typography, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Container sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mt: 3 }}>
      {/* Sidebar */}
      <Container
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: "2px solid grey",
          paddingY: 3,
        }}
      >
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />

        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
          {coin?.name}
        </Typography>

        {/* Coin Description */}
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            paddingX: 3,
            textAlign: "justify",
          }}
          dangerouslySetInnerHTML={{ __html: coin?.description?.en.split(". ")[0] + "." }}
        />

        {/* Market Data */}
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "start" },
            paddingY: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}>
            Rank:{" "}
            <Typography component="span" variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Montserrat", mt: 1 }}>
            Current Price:{" "}
            <Typography component="span" variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Montserrat", mt: 1 }}>
            Market Cap:{" "}
            <Typography component="span" variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
            </Typography>
          </Typography>
        </Container>
      </Container>

      {/* Coin Chart Section */}
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
