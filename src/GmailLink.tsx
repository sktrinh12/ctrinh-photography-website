import React from "react";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface GmailLinkProps {
  email: string;
}

const GmailLink: React.FC<GmailLinkProps> = ({ email }) => {
  const composeUrl = `mailto:${email}`;

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 8 }} />
      <a href={composeUrl} target="_blank" rel="noopener noreferrer">
        <Typography variant="body1">{email}</Typography>
      </a>
    </Box>
  );
};

export default GmailLink;
