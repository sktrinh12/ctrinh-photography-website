import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

interface InstagramProfileLinkProps {
  handle: string;
}

const InstagramProfileLink: React.FC<InstagramProfileLinkProps> = ({
  handle,
}) => {
  const profileUrl = `https://www.instagram.com/${handle}`;

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <FontAwesomeIcon icon={faInstagram} style={{ marginRight: 8 }} />
      <a href={profileUrl} target="_blank" rel="noopener noreferrer">
        <Typography variant="body1">@{handle}</Typography>
      </a>
    </Box>
  );
};

export default InstagramProfileLink;
