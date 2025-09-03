import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import heroImg from "../../img/hero_illustration.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "56px",
    color: "#1A1A2E",
    fontWeight: "900",
    margin: theme.spacing(4, 0, 4, 0),
    letterSpacing: "1.5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "36px",
    },
  }));

  const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    color: "#4B4B6A",
    fontWeight: "500",
    marginBottom: theme.spacing(4),
    lineHeight: 1.6,
  }));

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #e0f2fe, #f3e8ff)",
        minHeight: "95vh",
        paddingBottom: 8,
      }}
    >
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "2" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#6B7280",
                fontWeight: "600",
                mt: 1,
                mb: 4,
                textTransform: "uppercase",
                letterSpacing: "2px",
                paddingBottom: 8,
                paddingTop: "120px",
              }}
            >
              Welcome to UltraReal
            </Typography>
            <Title variant="h1">
              Securely Authenticate Your Products with UltraReal
            </Title>
            <Subtitle>
              Our blockchain-based product identification system provides a
              secure and reliable way to authenticate your products and protect
              against fraud.
            </Subtitle>
            <Link to="/scanner" style={{ textDecoration: "none" }}>
              <CustomButton
                backgroundColor="#2563EB"
                color="#fff"
                buttonText="Scan QR"
                heroBtn={true}
                sx={{
                  boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.39)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#1D4ED8",
                    boxShadow: "0 6px 20px 0 rgba(29, 78, 216, 0.5)",
                  },
                }}
              />
            </Link>
          </Box>

          <Box sx={{ flex: "1.25", paddingBottom: 8, paddingTop: "120px" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{
                maxWidth: "100%",
                marginBottom: "2rem",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
