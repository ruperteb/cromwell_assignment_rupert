"use client";
import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { logout, verify } from "@/lib/redux/features/auth/authThunks";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DrawerMenu from "./drawerMenu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledLink = styled(Link)`
  text-decoration: unset;
  align-self: center;
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: #1c355e;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;

    transform: translate3d(-100%, 0, 0);
  }
  &:hover::after {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Verifying existing session (if present) and updating auth state
  useEffect(() => {
    dispatch(verify());
  }, [dispatch]);

  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const isAccountMenuOpen = Boolean(accountAnchorEl);
  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const [drawerMenuOpen, setDrawerMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerMenuOpen(!drawerMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const renderMenu = (
    <Menu
      anchorEl={accountAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      id="account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isAccountMenuOpen}
      onClose={handleAccountMenuClose}
      slotProps={{ paper: { sx: { minWidth: 130 } } }}
    >
      <MenuItem
        onClick={() => {
          router.push("/profile");
          handleAccountMenuClose;
        }}
      >
        <PersonIcon sx={{ marginRight: 2 }} />
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
          handleAccountMenuClose();
        }}
      >
        <LogoutIcon sx={{ marginRight: 2 }} />
        Logout
      </MenuItem>
    </Menu>
  );
  const pages = [
    { name: "Home", url: "/", visibility: "public", icon: <HomeIcon /> },
    { name: "About", url: "/about", visibility: "public", icon: <InfoIcon /> },
    {
      name: "Profile",
      url: "/profile",
      visibility: "user",
      icon: <PersonIcon />,
    },
    { name: "Users", url: "/users", visibility: "admin", icon: <GroupIcon /> },
  ];

  const visibleLinks = pages.filter((page) => {
    if (page.visibility === "public") {
      return true;
    }
    if (page.visibility === "user" && auth.role) {
      return true;
    }
    if (page.visibility === "admin" && auth.role === "admin") {
      return true;
    }
    return false;
  });
  return (
    <Stack direction="row" component="nav">
      <Stack
        direction="row"
        sx={{ gap: 3, display: { xs: "none", md: "flex" }, marginRight: 6 }}
      >
        {visibleLinks.map((link) => (
          <StyledLink key={link.name} href={link.url}>
            <Typography sx={{ color: "#1c355e" }}>{link.name}</Typography>
          </StyledLink>
        ))}
      </Stack>
      {auth.userId ? (
        <>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleAccountMenuOpen}
            color="primary"
            sx={{
              margin: "0px 0px 0px 10px",
              display: { xs: "none", md: "flex" },
            }}
          >
            <AccountCircle />
          </IconButton>
          {renderMenu}
        </>
      ) : (
        <Stack
          direction="row"
          sx={{ gap: 1, display: { xs: "none", md: "flex" } }}
        >
          <Button
            size="small"
            variant="outlined"
            sx={{ alignSelf: "center" }}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Divider variant="middle" orientation="vertical" flexItem />
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            sx={{ alignSelf: "center" }}
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </Stack>
      )}
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{
          ...(drawerMenuOpen && { opacity: 0 }),
          height: "fit-content",
          alignSelf: "center",
          color: "#ff5100",
          display: { xs: "flex", md: "none" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <DrawerMenu
        drawerOpen={drawerMenuOpen}
        handleDrawerClose={handleDrawerToggle}
        links={visibleLinks}
        handleLogout={handleLogout}
        isAuth={!!auth.userId}
      />
    </Stack>
  );
};

export default Navbar;
