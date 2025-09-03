import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import homeIllustration from "../../img/illustration.png";
import CustomButton from "./CustomButton";

const GetStarted = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#F9FAFB",
    height: "416px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(3, 3, 0, 3),
      width: "90%",
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 0, 10, 0),
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  }));

  return (
    <CustomBox>
      <CustomContainer>
        <Box>
          <Typography
            sx={{ fontSize: "35px", color: "#1A1A2E", fontWeight: "700" }}
          >
            Featured Products
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: "#4B4B6A", fontWeight: "500", my: 3 }}
          >
            Everything you need to know about supply chain traceability!
          </Typography>

          <CustomButton
            backgroundColor="#2563EB"
            color="#fff"
            buttonText="Get Started Now"
            getStartedBtn={true}
          />
        </Box>

        <img
          src={homeIllustration}
          alt="illustration"
          style={{ maxWidth: "100%" }}
        />
      </CustomContainer>
    </CustomBox>
  );
};

export default GetStarted;
