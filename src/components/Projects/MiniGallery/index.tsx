import { Box, IconButton, SimpleGrid, Image } from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";
import { api } from "../../../services/api";
import { toastApiResponse } from "../../Toast";

export default function MiniGallery({ allImagesBoat, boatId, setAllImagesBoat }: any) {

  async function refreshImages() {
    const response = await api.get(`/list_boat_by_id.php?id=${boatId}`);
    setAllImagesBoat(response.data[0].images);
  }

  async function handleDeleteBoatFromArray(image: string) {
    const response = await api.post('/delete_image_boats.php',
      {
        "boat_id": boatId,
        "name_image": image
      }
    );

    toastApiResponse(response, response.data.message);
    await refreshImages()

  }

  return (
    <Box w="100%" height={'auto'}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2}>
        {allImagesBoat &&
          allImagesBoat.map((image: any, index: any) =>
            index !== 0 ? (
              <Box
                w="100%"
                h="20vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={2}
                position="relative"
                key={index}
                bg='black'
              >
                <IconButton
                  aria-label="Excluir"
                  bg="red"
                  size="sm"
                  onClick={() => handleDeleteBoatFromArray(image)}
                  position="absolute"
                  top={2}
                  right={2}
                  zIndex={1}
                >
                  <Box color="white">
                    <FaTrashCan />
                  </Box>
                </IconButton>

                <Image
                  src={`https://techsoluctionscold.com.br/api-boats/uploads/boats_images/${image}`}
                  alt=""
                  w="100%"
                  height="100%"
                  objectFit="cover"
                  display="-webkit-inline-box"
                  style={{ display: '-webkit-inline-box', width: 'auto' }}
                />
              </Box>
            ) : null
          )}
      </SimpleGrid>
    </Box>
  );
};
