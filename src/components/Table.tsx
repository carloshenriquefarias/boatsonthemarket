import { Container, Box, TableContainer, Table, Thead, Tbody, Th, Tr, Td, Text, useColorModeValue } from '@chakra-ui/react';

interface Payment {
  idTransaction: string;
  user: string;
  plan: string;
  price: string;
  createdAt: string;
  month: string;
  year: string;
  methodPayment: string;
  status: string;
}

interface DataTableProps {
  payments: Payment[];
  bgColor: string;
}

const NewTable: React.FC<DataTableProps> = ({ payments, bgColor }) => {
  return (
    <Container maxW="full" py={2}>
      <Box border="1px solid" borderColor="gray.100" rounded="md" boxShadow="lg" overflow="hidden" mb={4}>
        <TableContainer>
          <Table size="md">
            <Thead>
              <Tr fontWeight="900" bg={bgColor}>
                <Th>ID</Th>
                <Th>User name</Th>
                <Th>Plan selected</Th>
                <Th>Price</Th>
                <Th>Created at</Th>
                <Th>Month</Th>
                <Th>Year</Th>
                <Th>Method payment</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {payments.map((payment, index) => (
                <Tr key={index} _hover={{ bg: 'lightblue' }} cursor={'pointer'}>
                  <Td fontSize="md" color={'blue.500'}>{payment.idTransaction}</Td>
                  <Td fontSize="md" color={'blue.500'}>{payment.user}</Td>
                  <Td fontSize="md" color={'blue.500'}>{payment.plan}</Td>
                  <Td fontSize="md" color={'blue.500'}>{payment.price}</Td>
                  <Td fontSize="md" color={'blue.500'}>{payment.createdAt}</Td>
                  <Td fontSize="md" color={'blue.500'}>{payment.month}</Td>
                  <Td fontSize="md" color={'blue.500'}>{payment.year}</Td>
                  <Td fontSize="md" color={'blue.500'}>{payment.methodPayment}</Td>
                  <Td>
                    <Box
                      w="auto" h='1.8rem'
                      bg={useColorModeValue(payment.status === 'Active' ? 'green.100' : 'red.400', 'gray.600')}
                      rounded="md"
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text textAlign={'center'} pt={1} color={'white'} fontSize={['2xs', 'xs', 'sm', 'md']}>
                        {payment.status}
                      </Text>
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default NewTable;

