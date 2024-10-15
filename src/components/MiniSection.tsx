import { PropsWithChildren } from 'react';
import { Stack, Text, useColorModeValue, Image, Box, TextProps } from '@chakra-ui/react';

interface MiniSectionProps {
  firstTextOfComponent: string | undefined;
  secondTextOfComponent?: string;
  image: string;
  imagePosition: 'left' | 'right';
  handleInputChangesNew?: (event: any) => void;
}

const MiniSection = ({ firstTextOfComponent, secondTextOfComponent, imagePosition, image }: MiniSectionProps) => {
  const isImageOnLeft = imagePosition === 'left';

  return (
    <Stack direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }} justifyContent="center" mt={5}>
      {isImageOnLeft && (
        <Box mr={{ base: 0, sm: 1, md: 2, lg:3 }} pos="relative">
          <DottedBox />
          <Box w="100%" height="auto" borderRadius={10}>
            <Image
              src={image}
              alt=""
              w="100%"
              minW={{ base: 'auto', md: '30rem' }}
              maxH={{ base: 300, md: 400, lg: 500 }}
              h="100%"
              objectFit="cover"
              borderRadius={10}
            />
          </Box>
        </Box>
      )}

      <Stack direction="column" spacing={6} justifyContent="center">
        <Box>
          <Content mt={4} fontSize={['2xs', 'xs', 'sm', 'md', 'lg', 'xl']}>{firstTextOfComponent}</Content>
          <Content mt={4} fontSize={['2xs', 'xs', 'sm', 'md', 'lg', 'xl']}>{secondTextOfComponent}</Content>
        </Box>
      </Stack>

      {!isImageOnLeft && (
        <Box ml={{ base: 0, md: 3 }} pos="relative">
          <DottedBox />
          <Box w="100%" height="auto" borderRadius={10}>
            <Image
              src={image}
              alt=""
              w="100%"
              minW={{ base: 'auto', md: '30rem' }}
              maxH={{ base: 300, md: 400, lg: 500 }}
              h="100%"
              objectFit="cover"
              borderRadius={10}
            />
          </Box>
        </Box>
      )}
    </Stack>
  );
};

const Content = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text
      fontSize="md"
      textAlign="left"
      lineHeight="1.375"
      fontWeight="400"
      color="gray.500"
      {...props}
    >
      {children}
    </Text>
  );
};

function DottedBox() {
  return (
    <Box position="absolute" left="-45px" top="-30px" height="full" maxW="700px" zIndex={-1}>
      <svg
        color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
      </svg>
    </Box>
  );
}

export default MiniSection;