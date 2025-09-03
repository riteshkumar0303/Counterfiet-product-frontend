import { Button, styled } from "@mui/material";
import React from "react";

const CustomButton = ({
  backgroundColor = "transparent",
  color = "#000",
  buttonText,
  heroBtn,
  guideBtn,
  getStartedBtn,
}) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: "700",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0.5rem 1.25rem",
    borderRadius: "7px",
    textTransform: "none",
    display: "block",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#e0e0e0", // Light gray on hover
      color: "#000",              // Always visible text
      borderColor: "#ccc",
    },
    [theme.breakpoints.down("md")]: {
      margin: (heroBtn || getStartedBtn) && theme.spacing(0, "auto", 3, "auto"),
      width: (heroBtn || getStartedBtn) && "90%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: guideBtn && theme.spacing(3),
      width: guideBtn && "90%",
    },
  }));

  return <StyledButton>{buttonText}</StyledButton>;
};

export default CustomButton;
