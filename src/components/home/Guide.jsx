import { Box, styled, Typography } from "@mui/material";
import React from "react";

// import buyIcon from "../../img/buy_icon.png";
// import sellIcon from "../../img/sell_icon.png";
// import rentIcon from "../../img/rent_icon.png";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomButton from "./CustomButton";

const Guide = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  // const GuidesBox = styled(Box)(({ theme }) => ({
  //   display: "flex",
  //   justifyContent: "space-around",
  //   width: "70%",
  //   marginTop: theme.spacing(5),
  //   marginBottom: theme.spacing(5),
  //   [theme.breakpoints.down("md")]: {
  //     width: "100%",
  //   },
  //   [theme.breakpoints.down("sm")]: {
  //     marginBottom: "0",
  //     flexDirection: "column",
  //   },
  // }));

  // const GuideBox = styled(Box)(({ theme }) => ({
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   marginTop: theme.spacing(5),
  //   [theme.breakpoints.down("sm")]: {
  //     margin: theme.spacing(2, 0, 2, 0),
  //   },
  // }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5rem",
        backgroundColor: "#F9FAFB",
        padding: "4rem 0",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#2563EB",
          margin: "0 auto",
          borderRadius: "2px",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#1A1A2E", my: 3 }}
      >
        How it works?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#4B4B6A",
            textAlign: "center",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Our fake product identification system using blockchain technology assigns a unique digital ID to each product that is recorded on the blockchain. Consumers can scan the product's QR code or enter its digital ID on our website to verify its authenticity and ensure it has not been tampered with or counterfeited. By leveraging the security and transparency of the blockchain, our system provides a reliable and efficient way to combat product counterfeiting and protect consumers' safety and trust.
        </Typography>
      </CustomBox>

      {/* Uncomment and update guide categories if needed */}
      {/* <GuidesBox>
        <GuideBox>
          <img src={buyIcon} alt="buyIcon" />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Buying Guides
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#2563EB" }}
            >
              How to buy
            </Typography>
            <ArrowRightAltIcon style={{ color: "#2563EB" }} />
          </Box>
        </GuideBox>

        <GuideBox>
          <img src={rentIcon} alt="buyIcon" />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Renting Guides
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#2563EB" }}
            >
              How to rent
            </Typography>
            <ArrowRightAltIcon style={{ color: "#2563EB" }} />
          </Box>
        </GuideBox>

        <GuideBox>
          <img src={sellIcon} alt="buyIcon" />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Selling Guides
          </Typography>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#2563EB" }}
            >
              How to sell
            </Typography>
            <ArrowRightAltIcon style={{ color: "#2563EB" }} />
          </Box>
        </GuideBox>
      </GuidesBox> */}

      <CustomButton
        backgroundColor="#2563EB"
        color="#fff"
        buttonText="See Full Guides"
        guideBtn={true}
      />
    </Box>
  );
};

export default Guide;
