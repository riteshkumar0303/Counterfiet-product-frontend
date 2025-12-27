import * as React from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import logoImg from "../../img/logo.png";
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
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ onContactClick }) => {
  const [mobileMenu, setMobileMenu] = useState({ top: false });
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const handleLogout = () => {
    setAuth({});
    navigate('/');
  };

  // ---------- Mobile Menu Items ----------
  const menuItems = [
    { text: "Home", to: "/", icon: <HomeIcon /> },
    { text: "About", to: "/aboutUs", icon: <FeaturedPlayListIcon /> },
    { text: "Our Story", to: "/our-story", icon: <HistoryIcon /> },
    { text: "Contact us", action: onContactClick, icon: <ContactsIcon /> },
  ];

  if (auth?.user) {
    menuItems.push({ text: "Logout", action: handleLogout, icon: <LogoutIcon /> });
  } else {
    menuItems.push({ text: "Login", to: "/login", icon: <ListAltIcon /> });
  }

  // ---------- Mobile Drawer ----------
  const list = (anchor) => (
    <Box
      sx={{
        width: "auto",
        backgroundColor: "rgba(255,255,255,0.95)",
        height: "auto",
        paddingBottom: 2,
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            {item.to ? (
              <ListItemButton
                component={Link}
                to={item.to}
                onClick={toggleDrawer(anchor, false)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "text.primary" }} />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  toggleDrawer(anchor, false)();
                  if (item.action) item.action();
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // ---------- Styles ----------
  const NavbarContainer = styled("nav")(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(2, 5),
    backgroundColor: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    zIndex: 1300,
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1, 2),
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    width: "150px",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "block",
      width: "120px",
    },
  }));

  // ---------- JSX ----------
  return (
    <NavbarContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
        <Box display="flex" alignItems="center">
          <CustomMenuIcon onClick={toggleDrawer("top", true)} />
          <Link to="/">
            <NavbarLogo src={logoImg} alt="Logo" />
          </Link>
        </Box>

        <Drawer
          anchor="top"
          open={mobileMenu.top}
          onClose={toggleDrawer("top", false)}
        >
          {list("top")}
        </Drawer>

        <Box
          display="flex"
          gap="1.5rem"
          alignItems="center"
          sx={{
            display: { xs: "none", md: "flex" }, // Hide on mobile (xs/sm), show on desktop (md+)
            marginLeft: 'auto',
            marginRight: '60px'
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <CustomButton
              backgroundColor="transparent"
              color="#000"
              buttonText="Home"
            />
          </Link>

          <Link to="/aboutUs" style={{ textDecoration: "none" }}>
            <CustomButton
              backgroundColor="transparent"
              color="#000"
              buttonText="About"
            />
          </Link>

          <Link to="/our-story" style={{ textDecoration: "none" }}>
            <CustomButton
              backgroundColor="transparent"
              color="#000"
              buttonText="Our Story"
            />
          </Link>

          {/* 🔹 CONTACT (SCROLL USING REF) */}
          <CustomButton
            backgroundColor="transparent"
            color="#000"
            buttonText="Contact us"
            onClick={onContactClick}
          />

          {auth?.user ? (
            <CustomButton
              backgroundColor="transparent"
              color="#000"
              buttonText="Logout"
              onClick={handleLogout}
            />
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <CustomButton
                backgroundColor="transparent"
                color="#000"
                buttonText="Login"
              />
            </Link>
          )}

        </Box>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;


