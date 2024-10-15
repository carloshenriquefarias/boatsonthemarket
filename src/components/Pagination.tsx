import { ReactNode, useEffect, useState } from 'react';
import { chakra, Container, Box, Stack, useColorModeValue, Text, HStack, useBreakpointValue } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationContainerProps {
  totalPages: number;
}

const PaginationContainer = ({ totalPages }: PaginationContainerProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(startPage + 4, totalPages);

  useEffect(() => {
    console.log(`Página atual: ${currentPage}`);
  }, [currentPage]);

  return (
    <Container
      maxWidth="7xl"
      w="full"
      h="auto"
      alignItems="center"
      mt={5}
      p={{ base: 3 }}
    >
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        startPage={startPage}
        endPage={endPage}
      />
    </Container>
  );
};

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  startPage: number;
  endPage: number;
}

const Pagination = ({ totalPages, currentPage, onPageChange, startPage, endPage }: PaginationProps) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      as="nav"
      aria-label="Pagination"
      spacing={2}
      w="full"
      justifyContent="center"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
    >
      <Box>
        <PaginationButton onClick={() => onPageChange(currentPage - 1)} isDisabled={currentPage === 1}>
          <HStack>
            <FaChevronLeft />
            <Text fontSize={['2xs', 'xs', 'sm', 'md']}>Previous</Text>
          </HStack>
        </PaginationButton>
      </Box>
      <Stack direction="row" spacing={2}>
        {[...Array(endPage - startPage + 1)].map((_, index) => (
          <PaginationButton
            key={startPage + index}
            onClick={() => onPageChange(startPage + index)}
            isActive={currentPage === startPage + index}
          >
            {startPage + index}
          </PaginationButton>
        ))}
      </Stack>
      <Box>
        <PaginationButton onClick={() => onPageChange(currentPage + 1)} isDisabled={currentPage === totalPages}>
          <HStack>
            <Text fontSize={['2xs', 'xs', 'sm', 'md']}> {isWideVersion ? ('Next page') : ('Next')}</Text>
            <FaChevronRight />
          </HStack>
        </PaginationButton>
      </Box>
    </Stack>
  );
};

interface PaginationButtonProps {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const PaginationButton = ({ children, isDisabled, isActive, onClick }: PaginationButtonProps) => {
  const activeStyle = {
    bg: useColorModeValue('blue.500', 'gray.700'),
    color: 'yellow.500',
  };

  return (
    <chakra.button
      onClick={onClick}
      py={1}
      px={3}
      border="1px solid"
      fontWeight={'bold'}
      bg='gray.50'
      borderColor={useColorModeValue('gray.100', 'gray.900')}
      rounded="md"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      {...(isActive && activeStyle)}
    >
      {children}
    </chakra.button>
  );
};

export default PaginationContainer;
