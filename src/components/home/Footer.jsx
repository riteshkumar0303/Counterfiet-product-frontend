import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { forwardRef } from "react";
import MailIcon from "@mui/icons-material/Mail";

const Footer = forwardRef((props, contactRef) => {
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

  const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: "#6B7280",
    cursor: "pointer",
    "&:hover": { color: "#2563EB" },
  }));

  return (
    <Box sx={{ py: 10 }} ref={contactRef} id="footer">
      <CustomContainer>
        <Box>
          <Typography fontSize={20} fontWeight={700} mb={2}>
            Products
          </Typography>
          <FooterLink>Product Verification</FooterLink><br />
          <FooterLink>Supply Chain Tracking</FooterLink><br />
          <FooterLink>Anti-Counterfeiting</FooterLink><br />
          <FooterLink>Smart Contracts</FooterLink>
        </Box>

        <Box>
          <Typography fontSize={20} fontWeight={700} mb={2}>
            Resources
          </Typography>
          <FooterLink>How It Works</FooterLink><br />
          <FooterLink>Case Studies</FooterLink><br />
          <FooterLink>Blog</FooterLink><br />
          <FooterLink>Whitepaper</FooterLink>
        </Box>

        <Box>
          <Typography fontSize={20} fontWeight={700} mb={2}>
            Company
          </Typography>
          <FooterLink>About Us</FooterLink><br />
          <FooterLink>Partnerships</FooterLink><br />
          <FooterLink>Terms of Use</FooterLink><br />
          <FooterLink>Privacy Policy</FooterLink>
        </Box>

        <Box>
          <Typography fontSize={20} fontWeight={700} mb={2}>
            Get in touch
          </Typography>
          <Typography fontSize={16} color="#6B7280" mb={2}>
            Let us help you find the perfect solution for your needs.
          </Typography>
          <Typography fontSize={16} color="#6B7280" mb={1} sx={{ lineHeight: 1.8 }}>
            <span>+91 7007012586</span> &nbsp;|&nbsp;
            <span>+91 9005780653</span> &nbsp;|&nbsp;
            <span>+91 8299461864</span>
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mb={2} sx={{ color: "#6B7280", fontSize: "16px" }}>
            <MailIcon fontSize="small" />
            <span>ultrareal737@gmail.com</span>
          </Box>
        </Box>
      </CustomContainer>
    </Box>
  );
});

export default Footer;


