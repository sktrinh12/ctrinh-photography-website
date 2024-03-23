import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import MasonryImageList from "./MasonryImageList";
import About from "./About";
import Title from "./Title";
import NestedMenu from "./NestedMenu";
import NavMenu from "./NavMenu";
import Home from "./Home";
import HealthStatus from "./Health";
// @ts-ignore
import { caption, imageUrl } from "./metadata";

function AppLayout() {
  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            width: "20%",
            minWidth: "150px",
            borderRight: "none",
            p: 2,
          }}
        >
          <Title />
          <NestedMenu />
          <NavMenu />
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/image-list-1"
              element={<MasonryImageList subfolder={"test"} />}
            />
            <Route
              path="/image-list-2"
              element={<MasonryImageList subfolder={"test"} />}
            />
            <Route path="/health" element={<HealthStatus />} />
            <Route
              path="/"
              element={<Home imageUrl={imageUrl} caption={caption} />}
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default AppLayout;
