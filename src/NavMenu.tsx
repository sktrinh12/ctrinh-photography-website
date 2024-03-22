import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const NavMenu = () => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <List component="div" disablePadding>
        <ListItemButton component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItemButton>
      </List>
    </List>
  );
};

export default NavMenu;
