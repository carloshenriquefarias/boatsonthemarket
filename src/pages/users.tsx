import {
  Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, VStack, Box, HStack,
  Container, Stack, Avatar,
  Spinner
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuMiniStatistics from '../components/MenuMiniStatistics';

// import PaginationContainer from '../components/Pagination';
// import UsersList from '../components/UsersList';

import { Fragment } from 'react';
// import { BsDot } from 'react-icons/bs';

import { ImUserTie } from "react-icons/im";
import { MdCalendarMonth } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { toastApiResponse } from '../components/Toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  photo_filename: string;
  created_at: string;
  is_admin: string;
  admin: null | string;
}

export default function Admin() {

  const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const [allCurrentUsers, setAllCurrentUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 20;

  const [dateCounts, setDateCounts] = useState({
    todayCount: 0,
    lastWeekCount: 0,
    lastMonthCount: 0
  });

  const statisticsData = [
    { bg: 'blue', icon: ImUserTie, name: 'Total users', value: allUsers.length },
    { bg: 'blue', icon: IoMdSunny, name: 'Registered today', value: dateCounts.todayCount },
    { bg: '', icon: MdCalendarMonth, name: 'Registered last week', value: dateCounts.lastWeekCount },
    { bg: '', icon: MdCalendarMonth, name: 'Registered last month', value: dateCounts.lastMonthCount },
  ];

  const calculateDateCounts = (allUsers: User[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastWeek = new Date(now.setDate(today.getDate() - 7));
    const lastMonth = new Date(now.setDate(today.getDate() - 30));

    let todayCount = 0;
    let lastWeekCount = 0;
    let lastMonthCount = 0;

    allUsers.map(user => {
      const userDate = new Date(user.created_at);
      if (userDate >= today) {
        todayCount++;
      }
      if (userDate >= lastWeek) {
        lastWeekCount++;
      }
      if (userDate >= lastMonth) {
        lastMonthCount++;
      }
    });

    return { todayCount, lastWeekCount, lastMonthCount };
  };

  const handlePortalAdmin = () => {
    navigate('/admin');
  };

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await api.post('/user/list_all.php');
      const allUsersResponse = response.data;
  
      const sortedUsers = allUsersResponse.sort((a: any, b: any) => {
        const idA = parseInt(a.id);
        const idB = parseInt(b.id);
        return idB - idA;
      });
  
      setAllUsers(sortedUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load news details');
    }
  };
  

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Isso garante que a rolagem seja suave.
    });
  }

  function updateCurrentBoats(pageNumber: any) {
    const startIndex = (pageNumber - 1) * recordsPerPage;
    const newCurrentBoats = allUsers.slice(startIndex, startIndex + recordsPerPage);
    setAllCurrentUsers(newCurrentBoats);
    setCurrentPage(pageNumber);
    scrollToTop();
  }

  const PaginationControls: React.FC<{
    currentPage: number,
    totalPages: number,
    setCurrentPage: (page: number) => void,
    updateCurrentPayments: (page: number) => void
  }> = ({ currentPage, totalPages, setCurrentPage, updateCurrentPayments }) => {

    const numPageButtons = 5;
    const halfPageRange = Math.floor(numPageButtons / 2);

    let startPage = Math.max(1, currentPage - halfPageRange);
    let endPage = Math.min(totalPages, startPage + numPageButtons - 1);

    if (endPage - startPage + 1 < numPageButtons) {
      startPage = Math.max(1, endPage - numPageButtons + 1);
    }

    const pages = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

    return (
      <Flex justifyContent="center" alignItems="center" p={4} gap={2}>
        <Button onClick={() => {
          setCurrentPage(1);
          updateCurrentPayments(1);
        }} disabled={currentPage === 1}>&laquo;</Button>

        {pages.map(page => (
          <Button
            key={page}
            colorScheme={page === currentPage ? "blue" : "gray"}
            onClick={() => {
              setCurrentPage(page);
              updateCurrentPayments(page);
            }}
          >
            {page}
          </Button>
        ))}

        <Button onClick={() => {
          setCurrentPage(totalPages);
          updateCurrentPayments(totalPages);
        }} disabled={currentPage === totalPages}>&raquo;
        </Button>
      </Flex>
    );
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(allUsers.length / recordsPerPage);
    setTotalPages(newTotalPages);
    updateCurrentBoats(1);
  }, [allUsers]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const counts = calculateDateCounts(allUsers);
    setDateCounts(counts);
  }, [allUsers]);

  return (
    <>
      {user?.is_admin == '1' ? (
        <Flex direction="column" height="100%" bg="white">
          <Header />

          {/* <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 1 }}
          > */}
          <SimpleGrid
            columns={{ base: 1, md: 1, lg: 1 }}
            spacing={3}
            w="100%"
            maxWidth={1480}
            mx='auto'
            mt={5}
            px={3}
          >
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Box justifyContent={'flex-start'} alignItems={'center'}>
                <Text
                  color={textColorPrimary}
                  fontWeight="bold"
                  fontSize="2xl"
                  mt="5px"
                  textAlign="left"
                >
                  All about the users
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                  This place you can see all data about the users
                </Text>
              </Box>

              <Button bg='gray.50' w='auto' h={'80px'} onClick={handlePortalAdmin}>
                <VStack pt={0}>
                  <Icon as={ImUserTie} color={'blue.300'} h='28px' w='28px' />
                  <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Portal admin</Text>
                </VStack>
              </Button>
            </HStack>

            <Divider />
          </SimpleGrid>
          {/* </motion.div> */}

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              All statistics users
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4, "2xl": 4 }}
              gap='20px'
              spacing={10}
              my='20px'
              w="100%"
              maxWidth={1480}
              mx='auto'
            >
              {statisticsData.map((data, index) => (
                <MenuMiniStatistics key={index} {...data} />
              ))}
            </SimpleGrid>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ duration: 0.8 }}
            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Card bg={'bg'} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
              <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
                List users
              </Text>
              {/* <UsersList/> */}
              {/* <PaginationContainer totalPages={100}/> */}

              {loading ?
                <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Stack>
                :
                <>
                  <Container maxW="100%" p={{ base: 2, md: 2 }}>
                    <VStack
                      boxShadow={useColorModeValue(
                        '2px 6px 8px rgba(160, 174, 192, 0.6)',
                        '2px 6px 8px rgba(9, 17, 28, 0.9)'
                      )}
                      bg={useColorModeValue('gray.50', "navy.700")}
                      rounded="md"
                      overflow="hidden"
                      spacing={0}
                    >
                      {allCurrentUsers.map((user, index) => (
                        <Fragment key={index}>
                          <Flex
                            w="100%"
                            justifyContent="space-between"
                            alignItems="center"
                            _hover={{ bg: useColorModeValue('white', 'white') }}
                          >
                            <Stack spacing={0} direction="row" alignItems="center">
                              <Flex p={4}>
                                <Avatar size="md" name={user.name} src={user.photo_filename} />
                              </Flex>
                              <Flex direction="column" p={2}>
                                <Text
                                  color={useColorModeValue('blue.300', 'white')}
                                  fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                                  fontWeight={'semibold'}
                                  dangerouslySetInnerHTML={{ __html: user.name }}
                                />

                                <Text
                                  color={useColorModeValue('gray.400', 'gray.200')}
                                  fontSize={{ base: 'sm', sm: 'md' }}
                                >
                                  Registered at: {user.created_at}
                                </Text>

                                {/* <Text
                              color={useColorModeValue('gray.400', 'gray.200')}
                              fontSize={{ base: 'sm', sm: 'md' }}
                            >
                              Plan selected: {user.phone_number}
                            </Text> */}

                                {user.phone_number !== '' ?
                                  <Text
                                    color={useColorModeValue('gray.400', 'gray.200')}
                                    fontSize={{ base: 'sm', sm: 'md' }}
                                  >
                                    Phone number: {user.phone_number}
                                  </Text>
                                  : null
                                }

                                <Text
                                  color={useColorModeValue('gray.400', 'gray.200')}
                                  fontSize={{ base: 'sm', sm: 'md' }}
                                >
                                  Status user: {user.is_admin === '0' ? 'Customer' : 'Administrator'}
                                </Text>

                                <Text
                                  color={useColorModeValue('gray.400', 'gray.200')}
                                  fontSize={{ base: 'sm', sm: 'md' }}
                                  fontWeight={'thin'}
                                >
                                  {user.email}
                                </Text>
                              </Flex>
                            </Stack>

                            {/* {user.isOnline && (
                              <Flex p={4}>
                                <Icon as={BsDot} w={10} h={10} color="blue.400" />
                              </Flex>
                            )} */}
                          </Flex>
                          <Divider m={0} />
                        </Fragment>
                      ))}
                    </VStack>
                  </Container>
                </>
              }

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                updateCurrentPayments={updateCurrentBoats}
              />
            </Card>            
          </motion.div>

          <ToastContainer />
          <Footer />
        </Flex>
      ) : (
        navigate('/')
      )}
    </>
  )
}