import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
// import { itemDataMock } from "./images";

const backendURL = import.meta.env.VITE_BACKEND_URL;

interface ImageData {
  img: string;
  title: string;
}

interface MasonryImageListProps {
  subfolder?: string;
}

const fetchImages = async (subfolder: string): Promise<ImageData[]> => {
  try {
    const response = await fetch(`${backendURL}/s3Urls/${subfolder}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const images = await response.json();
    return images.map((url: string, index: number) => ({
      img: url,
      title: `Image ${index + 1}`,
    }));
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return [];
  }
};

const MasonryImageList: React.FC<MasonryImageListProps> = ({ subfolder }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
  const [itemData, setItemData] = React.useState<ImageData[]>([]);
  const [imageCache, setImageCache] = React.useState<
    Record<string, ImageData[]>
  >({});

  React.useEffect(() => {
    const fetchAndCacheImages = async () => {
      if (imageCache[subfolder as string]) {
        setItemData(imageCache[subfolder as string]);
      } else {
        fetchImages(subfolder || "")
          .then((images) => {
            setItemData(images);
            setImageCache((prevCache) => ({
              ...prevCache,
              [subfolder as string]: images,
            }));
          })
          .catch((error) => console.error("Error fetching images:", error));
      }
    };
    fetchAndCacheImages();
  }, [subfolder]);

  const handleOpen = (index: number): void => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleNext = (): void => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % itemData.length);
  };

  const handlePrev = (): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? itemData.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ flex: 1, overflowY: "auto" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item, index) => (
          <ImageListItem
            key={item.img}
            onClick={() => handleOpen(index)}
            style={{ cursor: "pointer" }}
          >
            <img
              srcSet={item.img}
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "85%",
            maxHeight: "90%",
            overflow: "auto",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: -1,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ArrowBack />
          </IconButton>
          {itemData[currentImageIndex] && (
            <img
              src={itemData[currentImageIndex].img}
              alt={itemData[currentImageIndex].title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectPosition: "center",
              }}
            />
          )}
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: -1,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default MasonryImageList;
