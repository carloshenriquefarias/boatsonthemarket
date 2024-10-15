import { Box, Divider, SimpleGrid, Text, } from "@chakra-ui/react";
import CardAds from "../CardAds";

interface ImageData {
  imageUrl: string;
}

export default function AdsVertical({ imageUrl }: ImageData) {

  const adsList = [
    {
      id: '1',
      image: imageUrl,
    },
    {
      id: '2',
      image: 'https://img.freepik.com/free-vector/flat-summer-party-vertical-poster-template_79603-1619.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1700697600&semt=ais',
    },
    {
      id: '3',
      image: 'https://content.wepik.com/statics/26948308/preview-page0.jpg',
    },
    {
      id: '4',
      image: 'https://content.wepik.com/statics/26791060/preview-page0.jpg',
    },
    {
      id: '5',
      image: 'https://img.freepik.com/free-vector/flat-summer-party-vertical-poster-template-with-photo_52683-63371.jpg',
    },
    {
      id: '6',
      image: 'https://nightout.s3.amazonaws.com/media/posters/75316/large-c9c5e72115e56504.jpeg?1623270931',
    },
  ];

  return (
    <>
      <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'} color={'blue.400'} mt={10}>
        ADS VERTICAL
      </Text>

      <Divider borderColor="blue.400" mt={4} mb={6}></Divider>

      <Box w={{ base: "100%", md: "100%" }} h="100%">
        <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 6, xl: 6 }} spacing={2}>
          {adsList.map((item) => (
            <CardAds
              key={item.id}
              image={item.image}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  )
};