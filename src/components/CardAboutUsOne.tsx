import { Image, Stack, Heading, SimpleGrid } from '@chakra-ui/react'

interface CardAboutUsProps {
  image: string;
  title: string;
  description: string;
}

export default function CardAboutUsOne({ image, title, description }: CardAboutUsProps) {
  return (

    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={3}
      w="100%"
      maxWidth={1480}
      mx='auto'
      bg='white' h='auto' width="100%" borderRadius={5}
      mt={5}
    >
      <Stack
        bg="white"
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={image}
          alt=""
          w="100%"
          maxH={350}
          objectFit="cover"
        />
      </Stack>

      <Stack
        bg="white"
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading fontSize={["xl", "2xl"]}>{title}</Heading>
        <Heading fontSize={['xs', 'sm', "md", "lg"]} px={'5'} mt={5} color={'gray.400'} textAlign={'center'}>
          {description}
        </Heading>
      </Stack>
    </SimpleGrid>
  )
}


