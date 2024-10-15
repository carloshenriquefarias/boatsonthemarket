import { HStack, Icon, Text, Image, VStack, Box, SimpleGrid, Button } from "@chakra-ui/react";
import { TfiTimer } from "react-icons/tfi";
interface CardLatestNewsProps {
  image: string;
  title: string;
  description: string;
  date: string;
  onClick?: () => void;
}

export function CardLatestNews({ image, title, description, date, onClick }: CardLatestNewsProps) {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 1 }}
      spacing={3}
      borderColor={'gray.200'}
      borderWidth={'1px'}
      borderRadius={5}
      _hover={{ boxShadow: "0 0 0 5px cyan" }}
    >
      <VStack
        w={['100%']}
        h={'auto'}
        justifyContent='center'
        alignItems='flex-start'
        bg='white'
        borderRadius={5}
      >
        <Box
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
            maxH={{ base: 300, md: 300, lg: 300 }}
            height={'100%'}
            objectFit="cover"
          />
        </Box>

        <Box px={2}>
          <Text color={"blue.400"} fontSize={["sm", "md", "lg"]} fontWeight={'semibold'}>
            {title}
          </Text>
          
          <Text color={"gray.200"} fontSize={["xs", "sm"]} my={3}>
            {description}
          </Text>

          <HStack justifyContent='flex-start' alignItems='center' w='100%' pb={1}>
            <HStack>
              <Icon as={TfiTimer} color={"yellow.200"} />
              <Text color={"yellow.200"} fontSize={'sm'} fontWeight={'normal'}>
                Published at {date}
              </Text>
            </HStack>
          </HStack>

          <Button my={3} color={'gray.50'} lineHeight="inherit" rounded="md" bg={'blue.300'} variant="solid" w='full' onClick={onClick}>
            See the news
          </Button>
        </Box>
      </VStack>
    </SimpleGrid>
  )
}
