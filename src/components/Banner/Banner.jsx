import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "./Carousel";

const BannerContainer = styled(Box)({
  backgroundImage: "url('/banner2.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const BannerContent = styled(Container)({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const Tagline = styled(Box)({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

function Banner() {
  return (
    <BannerContainer>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontFamily: "Montserrat",
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" }, // Responsive size
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
        <Box sx={{ height: "50%", display: "flex", alignItems: "center" }}>
          <Carousel />
        </Box>
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
