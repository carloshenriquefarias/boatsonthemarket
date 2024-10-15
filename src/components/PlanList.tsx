import { Box, Card, CardBody, Divider, HStack, Heading, Icon, Stack, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { FcOk } from "react-icons/fc";
import { plans } from '../mock/planList';
import { useState } from "react";

export default function PlanList() {

  const [planSelected, setPlanSelected] = useState<string | null>(null);

  const handlePlanSelected = (planId: string) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);

    if (selectedPlan) {
      const planName = selectedPlan.id;
      setPlanSelected(planId);

      console.log('Plano Selecionado:', planName);
    }
  };

  function PlanButton({ plan, planSelected, handlePlanSelected }: {
    plan: {
      id: string;
      name: string;
      description: string;
      item: string[];
      price: string;
      isOnSale?: boolean;
      is_active?: boolean;
      maxFiles: number;
      video: number;
      saleEndDate: string;
    };
    planSelected: string | null;
    handlePlanSelected: (planId: string) => void;
  }) {
    const isSelected = planSelected === plan.id;

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
        onClick={() => handlePlanSelected(plan.id)}
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
                  {'This offer ends at '} {plan.saleEndDate} {'! Get now!'}
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
              <Text fontSize={["xs", "sm"]}>{plan.description}</Text>
            </Stack>
            <Box w='100%' mb={3} h='5vh' display='flex' alignItems='center' justifyContent='center'>
              <Heading fontSize={["xl", "2xl"]} textAlign='center' color={'blue.500'}>{plan.price}</Heading>
            </Box>

            <Divider />

            <VStack p={6} spacing={4} alignItems="flex-start">
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
          </Stack>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <VStack spacing={2} w='100%' mx='auto' pb={3} px={3}>
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5}>
          {plans.filter((plan: any) => plan.is_active === true)
            .map((plan, index) => (
              <PlanButton
                key={index}
                plan={plan}
                planSelected={planSelected}
                handlePlanSelected={handlePlanSelected}
              />
            ))}
        </SimpleGrid>
      </VStack>
    </>
  )
}