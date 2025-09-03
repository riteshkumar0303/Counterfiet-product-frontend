import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import logoImg from "../../img/logo.png";
import starsImg from "../../img/Star.png";
import logosImg from "../../img/logos.png";

const Companies = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(4, 0),
    backgroundColor: "#F9FAFB",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginBottom: theme.spacing(4),
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
    },
  }));

  const RatingText = styled(Typography)(({ theme }) => ({
    color: "#4B5563",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: theme.spacing(2),
  }));

  const LogosContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
    "& img": {
      maxHeight: "50px",
      margin: theme.spacing(0, 2),
      transition: "transform 0.3s ease",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
  }));

  return (
    <Box sx={{ mt: 10 }}>
      <CustomContainer>
        <CustomBox>
          <img src={logoImg} alt="logo" style={{ maxWidth: "60%", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} />
          <RatingText>
            Trusted by thousands of users worldwide
          </RatingText>
        </CustomBox>

        <Box>
          <img src={starsImg} alt="stars" style={{ maxWidth: "100%" }} />
          <RatingText>
            5-Star Rating (2k+ Reviews)
          </RatingText>
        </Box>
      </CustomContainer>

      <LogosContainer>
        <img src={logosImg} alt="logos" />
      </LogosContainer>
    </Box>
  );
};

export default Companies;
