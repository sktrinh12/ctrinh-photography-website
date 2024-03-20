import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";

const vibrateAnimation = keyframes`
  0% { transform: translate(0, 0); }
  10% { transform: translate(-2px, -1px); }
  20% { transform: translate(2px, 1px); }
  30% { transform: translate(-2px, 1px); }
  40% { transform: translate(2px, -1px); }
  50% { transform: translate(-2px, -1px); }
  60% { transform: translate(2px, 1px); }
  70% { transform: translate(-2px, 1px); }
  80% { transform: translate(2px, -1px); }
  90% { transform: translate(-2px, -1px); }
  100% { transform: translate(0, 0); }
`;

const Title: React.FC = () => {
  return (
    <Box
      sx={{
        marginLeft: "12px",
        fontWeight: 600,
        fontSize: "24px",
        marginBottom: "10px",
        "& h2": {
          transition: "transform 0.8s ease-in-out",
          ":hover": {
            animation: `${vibrateAnimation} 1.5s linear infinite`,
          },
        },
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 className="alice-regular"> Cindy Trinh</h2>
      </Link>
    </Box>
  );
};

export default Title;
