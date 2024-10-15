import { HStack, Icon, Text, VStack } from '@chakra-ui/react';

const ItemCardBoat = ({ items }: any) => {
  return (
    <VStack justifyContent='flex-start' alignItems='left' w='100%'>
      {items.map((item: any, index: any) => (
        <HStack key={index}>
          <Icon as={item.icon} color={"gray.200"} />
          <Text color={"gray.200"} fontSize={["2xs", "xs"]} fontWeight={'bold'}>
            {item.title}: {item.value} {item.extraInfo}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};

export default ItemCardBoat;

