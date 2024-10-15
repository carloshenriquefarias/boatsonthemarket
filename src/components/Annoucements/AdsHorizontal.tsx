import { Box, Center, Divider, Stack, Text, Image } from "@chakra-ui/react";

interface HProps {
  imageUrl: string;
  showTitle: boolean;
  onClick?: () => void;
}

export default function AdsHorizontal({ imageUrl, showTitle = true, onClick }: HProps) {
  return (
    <>
      { showTitle && (
        <>
          <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'} color={'blue.400'} mt={10}>
            HORIZONTAL
          </Text>

          <Divider borderColor="blue.400" mt={4} mb={6}></Divider>
        </>
      )}
      
      <Stack w="100%" height="auto" align="center" onClick={onClick} cursor={'pointer'}>
        <Center w="100%" height="auto">
          <Box w="100%" height="auto" borderRadius={10}>
            <Image
              src={imageUrl}
              alt=""
              w="100%"
              maxH={{ base: 300, md: 400 }}
              objectFit="cover"
              borderRadius={10}
            />
          </Box>
        </Center>
      </Stack>
    </>
  );
}