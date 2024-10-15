import { VStack, FormControl, FormLabel, Input, Text, Divider, Heading, Icon, Select, useBreakpointValue } from "@chakra-ui/react";
import { FaAsterisk } from "react-icons/fa";

function BoatForm({ formData, handleInputChange }: any) {
  const textColorSecondary = "gray.400";
  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <VStack spacing={2} w={isWideVersion ? '60%' : '95%'} mx='auto'>
      <VStack w={'100%'} mx='auto'>
        <Heading>Basic Information</Heading>
        <Text color={textColorSecondary} fontSize='md' me='26px' mb='5px'>
          Give us some basic information about your boat
        </Text>

        <Divider my={2} />
      </VStack>
      
      <VStack mt={5} w={'100%'} mx='auto'>
        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input
            type='text'
            name='nameBoat'
            value={formData.nameBoat}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>
            Year <Icon as={FaAsterisk} color="red.500" boxSize="10px" />
          </FormLabel>
          <Select
            name='yearBoat'
            value={formData.yearBoat}
            onChange={handleInputChange}
            placeholder="Select year"
          >
            {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => (
              <option key={index} value={new Date().getFullYear() - index}>
                {new Date().getFullYear() - index}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Maker <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
          <Input
            type='text'
            name='maker'
            value={formData.maker}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Model <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
          <Input
            type='text'
            name='model'
            value={formData.model}
            onChange={handleInputChange}
          />
        </FormControl>
      </VStack>
    </VStack>
  );
}

export default BoatForm;
