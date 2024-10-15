import { Text,SimpleGrid, HStack, Divider, useBreakpointValue} from "@chakra-ui/react";
import { boatTypeList } from "../mock/boatTypeList";
import { useNavigate } from "react-router-dom";

import BoatTypesButton from "./BoatTypesButton";
import BoatTypesCard from "./BoatTypes";

export default function PopularBoat() {

  const navigate = useNavigate();
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  })

  const handleClickGoListBoatByType = (boatType: string) => {
    localStorage.setItem('boatType', boatType);
    navigate('/listBoat');
  };

  return (
    <>
      {isWideVersion ? (
        <HStack
          bg="transparent"
          borderWidth={'3px'}
          borderColor={'yellow.300'}
          align="center"
          justifyContent="center"
          marginX="auto"
          py={4}
          px={4}
          spacing={1}
          mt={[-25, -50, -75, -100]}
        >
          <SimpleGrid columns={{ base: 1, md: 3, lg: 3, xl: 6 }} spacing={2}>
            {boatTypeList.map((item, index) => (
              <BoatTypesCard
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                // description={item.description}
                imageBoatType={item.image}
                onClick={() => handleClickGoListBoatByType(item.boatType)}
              />
            ))}
          </SimpleGrid>
        </HStack>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={1} mt={2}>
          <Text
            color={'gray.300'}
            fontWeight='bold'
            fontSize='xl'
            mt='10px'
            mx='10px'
            mb={2}
          >
            Boats categories
          </Text>

          <Divider />

          <SimpleGrid columns={{ base: 3, md: 6 }} spacing={1} mt={5} px={2}>
            {boatTypeList.map((item, index) => (
              <BoatTypesButton
                key={index}
                icon={item.icon}
                text={item.fullName}
                onClick={() => handleClickGoListBoatByType(item.boatType)}
              />
            ))}
          </SimpleGrid>
        </SimpleGrid>
      )}
    </>
  );
}
