import { Button, Flex, Input, Select } from '@chakra-ui/react'

export function SearchBox() {
  return (
    <Flex align="center" p={3} bg="transparent" w={'500px'} h={'32px'}>
      <Select w={'15%'} bg="white" borderRadius="5px 0px 0px 5px" h={'32px'} size={'sm'} color={'gray.300'}>
        <option>All</option>
      </Select>
      <Input
        type="text"
        placeholder="I am looking for..."
        color={'gray.400'}
        size="sm"
        flex="1"
        w={'40%'}
        bg="white"
      />
      <Button
        colorScheme="yellow"
        size="sm"
        bg="yellow.300"
        w={'15%'}
        borderRadius="0px 5px 5px 0px"
        color={'white'}
        fontSize={["2xs", "xs"]}
      >
        Search
      </Button>
    </Flex>
  );
}