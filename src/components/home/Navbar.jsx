import * as React from "react";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
// import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import logoImg from "../../img/logo.png";
// import { Container } from "@mui/system";
import CustomButton from "./CustomButton";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "rgba(255,255,255,0.95)",
        color: "#000",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "About", "Contact us", "Login"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ color: "#000" }}>
              <ListItemIcon sx={{ color: "#000" }}>
                {index === 0 && <HomeIcon />}
                {index === 1 && <FeaturedPlayListIcon />}
                {index === 2 && <ContactsIcon />}
                {index === 3 && <ListAltIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const NavbarContainer = styled("nav")(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2, 5),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)",
    zIndex: 1300,
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1, 2),
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    color: "#000",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    width: "150px",
    height: "auto",
    objectFit: "contain",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
  

  return (
    <NavbarContainer>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CustomMenuIcon onClick={toggleDrawer("left", true)} />
        <Drawer
          anchor="left"
          open={mobileMenu["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
        
        { <NavbarLogo src={logoImg} alt="PIA Platform" /> 
        
        
        
        }

        
        
      </Box>

      <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Keep this for centering
    gap: "1rem",
    flexWrap: "wrap",
    flexGrow: 1,
    marginLeft: "31.25rem",  // Add a margin to shift the content to the right
  }}
>

        <Link to="/" style={{ textDecoration: "none" }}>
          <CustomButton backgroundColor="transparent" color="#000" buttonText="Home" />
        </Link>
        <Link to="/aboutUs" style={{ textDecoration: "none" }}>
          <CustomButton backgroundColor="transparent" color="#000" buttonText="About" />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <CustomButton backgroundColor="transparent" color="#000" buttonText="Contact us" />
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <CustomButton backgroundColor="transparent" color="#000" buttonText="Login" />
        </Link>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
