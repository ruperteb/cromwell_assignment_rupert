"use client"
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useRouter } from "next/navigation";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

interface Props {
  drawerOpen: boolean;
  handleDrawerClose: () => void;
  links: { name: string; url: string; visibility: string; icon: JSX.Element }[];
  handleLogout: () => void;
  isAuth: boolean;
}

const DrawerMenu: React.FC<Props> = ({
  drawerOpen,
  handleDrawerClose,
  links,
  handleLogout,
  isAuth,
}) => {
  const router = useRouter();
  const drawerWidth = 256;

  const additionalMenuList = [
    { name: "Login", url: "/login", icon: <LoginIcon /> },
    { name: "Register", url: "/register", icon: <AppRegistrationIcon /> },
  ];

  return (
    <Drawer
      sx={{
        width: 0,
        transition: "all 0.225s cubic-bezier(0, 0, 0.2, 1)",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="right"
      open={drawerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {links.map(({ name, icon, url }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(url);
                handleDrawerClose();
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {isAuth ? (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleLogout();
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      ) : (
        <List>
          {additionalMenuList.map(({ name, icon, url }) => (
            <ListItem key={name} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(url);
                  handleDrawerClose();
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      <Divider />
    </Drawer>
  );
};

export default DrawerMenu;
