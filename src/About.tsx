import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import InstagramProfileLink from "./InstragramLink";
import GmailLink from "./GmailLink";

function About() {
  return (
    <Box sx={{ m: 4, textAlign: "left" }}>
      <Typography variant="h6" gutterBottom component="div">
        Cindy Trinh is a photographer, visual journalist, and activist who is
        passionate about social justice and human rights. Their photography aims
        to connect with people and places through the art of visual
        storytelling. They have been published and featured by popular media,
        including Aperture, HBO/HBO Max, NBC Asian America, Paper Magazine, The
        Hill, Bloomberg Businessweek, The New York Daily News, .Mic,
        Hyperallergic, and more. They have been exhibited at the Museum of the
        City of New York, Museum of Chinese in America, Flushing Town Hall, U.S.
        District Court for the Eastern District of NY, Pearl River Mart, Think
        Chinatown, BKC, Knockdown Center, and more. Cindy is the creator of
        Activist NYC, a documentary photo project about activism and social
        justice movements in New York City. Cindy is heavily involved in
        community activism, organizing, and regularly participates in
        exhibitions, art and cultural events, volunteer efforts, neighborhood
        programs, and more. Cindy is a champion for social justice and continues
        to tell stories of marginalized people through their photography and
        journalism.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom component="div">
        Contact:
      </Typography>
      <GmailLink email={"cynthiavtrinh@gmail.com"} />
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <FontAwesomeIcon icon={faPhone} style={{ marginRight: 8 }} />
        <Typography variant="body1">714-478-0309</Typography>
      </Box>
      <InstagramProfileLink handle={"cindytrinh.photo"} />
      <InstagramProfileLink handle={"activistnyc"} />
    </Box>
  );
}

export default About;
