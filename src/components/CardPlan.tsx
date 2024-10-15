import React, { useState } from 'react';
import { Card, CardBody, Stack, VStack, HStack, Icon, Text, Box, Divider, Heading, Button } from '@chakra-ui/react';
import { FcOk } from 'react-icons/fc';
interface Plan {
  id: string;
  name: string;
  description: string;
  item: string[];
  price: string;
  isOnSale?: boolean;
  maxFiles: number;
  video: number;
}

interface CardPlanProps {
  plan: Plan;
  planSelected?: string | null;
  handlePlanSelected?: (planId: string) => void;
  onClickEdit?: () => void;
}

const CardPlan: React.FC<CardPlanProps> = ({ plan, planSelected, onClickEdit}) => {
  const isSelected = planSelected === plan.id;
  const [newsStatus, setNewsStatus] = useState('1');

  async function handleAdsEnabledOrDisabled() {
    const newStatus = newsStatus === '1' ? '0' : '1';
    setNewsStatus(newStatus);
  }

  return (
    <Card
      id={plan.id}
      maxW='lg'
      height={'auto'}
      borderWidth={isSelected ? "3px" : "1px"}
      borderColor={isSelected ? "blue.300" : "gray.400"}
      bg={isSelected ? "lightblue" : "white"}
      w="100%"
      colorScheme="teal"
      variant="outline"
      cursor={'pointer'}
      // onClick={() => handlePlanSelected(plan.id)}
      transition="all 0.25s"
      transitionTimingFunction="spring(1 100 10 10)"
      _hover={{ transform: "translateY(-4px)", shadow: "xl", borderColor: "blue.300", bg: 'lightblue', borderWidth: "3px" }}
    >
      <CardBody>
        <Box
          bg={plan.isOnSale ? 'yellow.200' : 'blue.300'}
          w='100%'
          mb={3}
          h='7vh'
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={5}
        >
          {plan.isOnSale ? (
            <Stack w='100%' gap={1} pb={3}>
              <Heading fontSize={["md", "lg"]} textAlign='center' color='blue.500' pt={3}>
                ON SALE NOW {plan.name}
              </Heading>

              <Text fontSize={["xs", "sm"]} textAlign='center' color='blue.500'>
                {'This offer ends at '} {plan.id} {'! Get now!'}
              </Text>
            </Stack>
          ) : (
            <Heading fontSize={["md", "lg"]} textAlign='center' color='white'>
              {plan.name}
            </Heading>
          )}
        </Box>

        <Stack mt='6'>
          <Stack w='100%'>
            <Text fontSize={["xs", "sm"]} textAlign='center' color={'blue.500'}>{plan.description}</Text>
          </Stack>

          <Box w='100%' mb={1} h='5vh' display='flex' alignItems='center' justifyContent='center'>
            <Heading fontSize={["xl", "2xl"]} textAlign='center' color={'blue.500'}>{plan.price}</Heading>
          </Box>

          <Divider />

          <Box
            w="100%"
            h="20rem"
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            position="relative"
          >
            {newsStatus === '0' ? (
              <VStack
                top={0}
                h="100%"
                w="100%"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                zIndex={1}
              >
                <Box bg="gray.500" h="100%" w="100%" opacity={0.7} rounded="md" />
                <Text
                  fontFamily="heading"
                  fontSize="lg"
                  color="gray.100"
                  position="absolute"
                  zIndex={2}
                >
                  PLAN DISABLED
                </Text>
              </VStack>
            ) : (
              <VStack p={4} spacing={3} alignItems="flex-start" height={'20rem'}>
                <Text fontSize="sm" fontWeight="semibold">WHAT'S INCLUDED</Text>
                {plan.item.map((item, index) => (
                  <HStack key={index} spacing={3}>
                    <Icon as={FcOk} h={4} w={4} color="green.500" />
                    <Text fontSize="sm" color="gray.500">
                      {item}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            )}
          </Box>

          <VStack w="100%" h="100%" px={2}>
            <Box w="100%" h="auto" py={1}>
              <VStack spacing={2} align="stretch">
                <Button colorScheme="linkedin" onClick={onClickEdit} w="full">
                  EDIT
                </Button>

                <Button colorScheme={newsStatus === '0' ? 'gray' : 'teal'} onClick={handleAdsEnabledOrDisabled} w="full">
                  {newsStatus === '1' ? 'ENABLED' : 'DISABLED'}
                </Button>

                {/* <Button bg="red.400" color="white" onClick={openModalDeleteButton} w="full">
                  DELETE
                </Button> */}
              </VStack>
            </Box>
          </VStack>
        </Stack>
      </CardBody>
    </Card >
  );
}

export default CardPlan;
