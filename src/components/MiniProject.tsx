import { Box, Button, Flex, Image, Link, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import Card from "./Card";

export default function Project(props: any) {
  const { name, link, city, country, email, photo, ...rest } = props;

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  // const brandColor = useColorModeValue("brand.500", "white");
  
  return ( 
    <Card bg={bg} borderColor={'lightblue'} {...rest} p='14px' borderRadius={5} justifyContet={'space-between'} mt={2}>
      <Flex align='center' direction={{ base: "row", md: "row" }}>
        <Image h='80px' w='80px' src={photo} borderRadius='8px' me='20px' />
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight='500'
            fontSize='md'
            mb='4px'>
            {name}
          </Text>
          
          <Text
            fontWeight='500'
            color={textColorSecondary}
            fontSize='sm'
            me='4px'
          >
            {email}      
          </Text>

          <Text
            fontWeight='500'
            color={textColorSecondary}
            fontSize='sm'
            mt='4px'
          >
            {city} | {country}  
          </Text>
        </Box>

        <Link
          href={link}
          variant='no-hover'
          me='16px'
          ms='auto'
          p='0px !important'>
          <VStack>
            <Button>Profile I</Button>
            <Button>Contact</Button>
          </VStack>
        </Link>
      </Flex>
    </Card>
  );
}
