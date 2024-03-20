import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HomeProps {
  imageUrl: string;
  caption: string;
}

const Home: React.FC<HomeProps> = ({ imageUrl, caption }) => {
  return (
    <Box>
      <img
        src={imageUrl}
        alt="Home"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "80vh",
          objectFit: "cover",
        }}
      />
      <Box p={2} textAlign="center">
        <Typography
          style={{ fontFamily: '"Alice", sans-serif' }}
          variant="h7"
          component="p"
        >
          {caption}
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
