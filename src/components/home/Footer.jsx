import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

import fbIcon from "../../img/fbicon.png";
import twitterIcon from "../../img/twittericon.png";
import linkedinIcon from "../../img/linkedinicon.png";

const Footer = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    padding: theme.spacing(6, 0),
    backgroundColor: "#F9FAFB",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: "#6B7280",
    fontWeight: "400",
    cursor: "pointer",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#2563EB",
    },
  }));

  return (
    <Box sx={{ py: 10 }}>
      <CustomContainer>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#1A1A2E",
              fontWeight: "700",
              mb: 2,
            }}
          >
            Products
          </Typography>

          <FooterLink>Product Verification</FooterLink>
          <br />
          <FooterLink>Supply Chain Tracking</FooterLink>
          <br />
          <FooterLink>Anti-Counterfeiting</FooterLink>
          <br />
          <FooterLink>Smart Contracts</FooterLink>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#1A1A2E",
              fontWeight: "700",
              mb: 2,
            }}
          >
            Resources
          </Typography>

          <FooterLink>How It Works</FooterLink>
          <br />
          <FooterLink>Case Studies</FooterLink>
          <br />
          <FooterLink>Blog</FooterLink>
          <br />
          <FooterLink>Whitepaper</FooterLink>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#1A1A2E",
              fontWeight: "700",
              mb: 2,
            }}
          >
            Company
          </Typography>

          <FooterLink>About Us</FooterLink>
          <br />
          <FooterLink>Partnerships</FooterLink>
          <br />
          <FooterLink>Terms of Use</FooterLink>
          <br />
          <FooterLink>Privacy Policy</FooterLink>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#1A1A2E",
              fontWeight: "700",
              mb: 2,
            }}
          >
            Get in touch
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              color: "#6B7280",
              fontWeight: "500",
              mb: 2,
            }}
          >
            Let us help you find the perfect solution for your needs.
          </Typography>

          <IconBox>
            <img src={fbIcon} alt="fbIcon" style={{ cursor: "pointer" }} />
            <img
              src={twitterIcon}
              alt="twitterIcon"
              style={{ cursor: "pointer" }}
            />
            <img
              src={linkedinIcon}
              alt="linkedinIcon"
              style={{ cursor: "pointer" }}
            />
          </IconBox>
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
