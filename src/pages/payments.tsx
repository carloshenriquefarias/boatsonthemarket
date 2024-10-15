'use client'
import {
  Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, Text, Divider, Flex, SimpleGrid, HStack, Button,
  Icon, useColorModeValue, Input, Select, Stack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader, ModalOverlay
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewTable from "../components/Table";
// import PaginationContainer from "../components/Pagination";
import MenuMiniStatistics from "../components/MenuMiniStatistics";
import React, { useEffect } from "react";

import { BiSearchAlt2 } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { IoConstruct } from "react-icons/io5";
import { MdAttachMoney, MdBarChart } from "react-icons/md";
import { MdCleaningServices } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

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

export default function Payments() {

  const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const recordsPerPage = 10;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  const [currentPayments, setCurrentPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    user: '',
    plan: '',
    price: '',
    createdAt: '',
    month: '',
    year: '',
    status: '',
    methodPayment: ''
  });

  const statisticsData = [
    { bg: 'blue', icon: MdBarChart, name: 'Total payments', value: '10' },
    { bg: '', icon: FaCity, name: 'Payments pending', value: '12' },
    { bg: '', icon: MdBarChart, name: 'Payments finished', value: '7' },
    { bg: 'blue', icon: IoConstruct, name: 'Canceled', value: '4' },
    { bg: 'blue', icon: MdBarChart, name: 'Returned', value: '10' },
    { bg: 'white', icon: MdAttachMoney, name: 'Total global', value: '8.450,00' },
  ];

  const boxData = [
    { color: 'lightblue', height: '300px', borderRadius: 10 },
    { color: 'lightgreen', height: '300px', borderRadius: 10 },
  ];

  const allPayments = [
    { idTransaction: '001', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '002', user: 'Carlos Henrique', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'february', year: '2024', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '003', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'march', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '004', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2024', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '005', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2026', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '006', user: 'Timersom', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2027', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '007', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '008', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2025', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '009', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '010', user: 'Carlos Henrique', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'february', year: '2024', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '011', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'march', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '012', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2024', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '013', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2026', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '014', user: 'Timersom', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2027', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '015', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '016', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2025', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '017', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '018', user: 'Carlos Henrique', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'february', year: '2024', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '019', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'march', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '020', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2024', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '021', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2026', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '022', user: 'Timersom', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2027', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '023', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '024', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2025', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '025', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '026', user: 'Carlos Henrique', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'february', year: '2024', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '027', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'march', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '028', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2024', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '029', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2026', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '030', user: 'Timersom', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2027', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '031', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '032', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2025', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '033', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '034', user: 'Carlos Henrique', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'february', year: '2024', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '035', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'march', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '036', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2024', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '037', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2026', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '038', user: 'Timersom', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2027', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '039', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '040', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2025', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '041', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '042', user: 'Carlos Henrique', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'february', year: '2024', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '043', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'march', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '044', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2024', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '045', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2026', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '046', user: 'Timersom', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2027', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '047', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '048', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2025', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '049', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '050', user: 'Carlos Henrique', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'february', year: '2024', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '051', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'march', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '052', user: 'Loirinho', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2024', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '053', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2026', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '054', user: 'Timersom', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2027', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '055', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '056', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2025', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '057', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '058', user: 'Carlos Henrique', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'february', year: '2024', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '059', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'march', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '060', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2024', status: 'Inactive', methodPayment: 'debitCard' },
    { idTransaction: '061', user: 'Prisco Cleyton', plan: 'master', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2026', status: 'Active', methodPayment: 'debitCard' },
    { idTransaction: '062', user: 'Nemesio', plan: 'enhanced', price: '$15,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2027', status: 'Inactive', methodPayment: 'creditCard' },
    { idTransaction: '063', user: 'Alan Andrade', plan: 'classic', price: '$10,00', createdAt: '2022-01-01, 10:50 AM', month: 'january', year: '2024', status: 'Active', methodPayment: 'creditCard' },
    { idTransaction: '064', user: 'Zezinho da esquina', plan: 'free', price: '$0,00', createdAt: '2022-01-01, 10:50 AM', month: 'april', year: '2025', status: 'Inactive', methodPayment: 'debitCard' },
  ];

  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(allPayments);

  const activePayments = allPayments.filter(payment => payment.status === 'Active');
  const inactivePayments = allPayments.filter(payment => payment.status === 'Inactive');

  const handleGoToAdmin = () => {
    setIsLoading(true);
    navigate('/admin');
    setIsLoading(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleSearch() {
    setIsLoading(true);
    const results = allPayments.filter(payment => {
      return (!filters.user || payment.user.includes(filters.user)) &&
        (!filters.plan || payment.plan === filters.plan) &&
        (!filters.price || payment.price === filters.price) &&
        (!filters.createdAt || payment.createdAt === filters.createdAt) &&
        (!filters.month || payment.month.toString() === filters.month) &&
        (!filters.year || payment.year.toString() === filters.year) &&
        (!filters.status || payment.status === filters.status) &&
        (!filters.methodPayment || payment.methodPayment === filters.methodPayment)
        ;
    });
    setFilteredPayments(results);
    setSearchInitiated(true);
    setIsSearchEmpty(results.length === 0);
    setIsLoading(false);
    closeModal();
  }

  function updateCurrentPayments(page: any) {
    const startIndex = (page - 1) * recordsPerPage;
    const newCurrentPayments = filteredPayments.slice(startIndex, startIndex + recordsPerPage);
    setCurrentPayments(newCurrentPayments);
  }

  const PaginationControls: React.FC<{ 
    currentPage: number, 
    totalPages: number, 
    setCurrentPage: (page: number) => void, 
    updateCurrentPayments: (page: number) => void }> = ({ currentPage, totalPages, setCurrentPage, updateCurrentPayments }) => {

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

        {/* <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>&laquo;</Button>
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lsaquo;</Button> */}

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
        }} disabled={currentPage === totalPages}>&raquo;</Button>

        {/* <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>&rsaquo;</Button>
        <Button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>&raquo;</Button> */}
      </Flex>
    );
  };
  
  useEffect(() => {
    setFilteredPayments(allPayments);
  }, []);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredPayments.length / recordsPerPage);
    setTotalPages(newTotalPages);
    setCurrentPage(1);
    updateCurrentPayments(1);
  }, [filteredPayments]);  

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
                  Payments report
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                  Find all types of payments available by the sistem boats on the market
                </Text>
              </Box>

              <Button bg='gray.50' w='auto' h={'80px'} onClick={handleGoToAdmin}>
                <VStack pt={0}>
                  <Icon as={ImUserTie} color={'blue.300'} h='28px' w='28px' />
                  <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Admin portal</Text>
                </VStack>
              </Button>
            </HStack>

            <Divider />
          </SimpleGrid>
          {/* </motion.div> */}

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              All statistics about the payments
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
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

          <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' mb='10px'>
              Analitcs charts
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} w="100%" maxWidth={1480} mx="auto" mt={5}>
              {boxData.map((data, index) => (
                <Box key={index} bg={data.color} w="100%" h={data.height} borderRadius={data.borderRadius}>
                  {/* Conteúdo da Box */}
                </Box>
              ))}
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Payment list
            </Text>

            <Tabs w="100%" justifyContent={'center'} alignItems={'center'} marginX="auto" mt={5}>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 150 }}
                transition={{ duration: 0.8 }}
              >
                <Tabs isManual variant='enclosed'>
                  <TabList>
                    <Tab fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>ALL PAYMENTS</Tab>
                    <Tab fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>ALL APPROVED</Tab>
                    <Tab fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>ALL REPPROVED</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Box mt={5} mb={5}>
                        <Button bg='yellow.200' mb={5} ml={5} onClick={openModal}>
                          Advanced search
                        </Button>

                        <NewTable payments={currentPayments} bgColor="lightblue" />

                        {isSearchEmpty && (
                          <Box textAlign="center" my={5}>
                            <Text fontSize="lg" fontWeight="bold">
                              No one result was found for this search!
                            </Text>
                          </Box>
                        )}

                        {searchInitiated &&
                          <Button
                            colorScheme='gray'
                            color={'blue.500'}
                            ml={5}
                            _hover={{ backgroundColor: "gray.200" }}
                            fontSize="sm"
                            justifyContent="center"
                            alignItems="center"
                            size={'sm'}
                            onClick={() => {
                              setFilteredPayments(allPayments);
                              setIsSearchEmpty(false);
                              setFilters({
                                user: '', plan: '', price: '', createdAt: '', month: '', year: '', status: '', methodPayment: ''
                              });
                            }}
                          >
                            <HStack>
                              <Icon as={MdCleaningServices} fontSize="md" />
                              <Text>Reset Filter</Text>
                            </HStack>
                          </Button>
                        }

                        <PaginationControls
                          currentPage={currentPage}
                          totalPages={totalPages}
                          setCurrentPage={setCurrentPage}
                          updateCurrentPayments={updateCurrentPayments}
                        />
                      </Box>
                    </TabPanel>

                    <TabPanel>
                      <Box mt={5} mb={5}>
                        <NewTable payments={activePayments} bgColor="lightblue" />
                        {/* <PaginationContainer totalPages={100} /> */}
                      </Box>
                    </TabPanel>

                    <TabPanel>
                      <Box mt={5} mb={5}>
                        <NewTable payments={inactivePayments} bgColor="lightblue" />
                        {/* <PaginationContainer totalPages={100} /> */}
                      </Box>
                    </TabPanel>

                  </TabPanels>
                </Tabs>
              </motion.div>
            </Tabs>
          </Card>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="gray.700">Perform your advanced search</ModalHeader>
              <HStack w="100%" mt={1} px={6}>
                <Text color="gray.300" fontSize={'sm'}>
                  The filter will reply to your request as soon as possible
                </Text>
              </HStack>

              <Box w="100%" mt={4} px={6}>
                <Divider borderColor="gray.400" borderWidth='0.5px'></Divider>
              </Box>
              <ModalCloseButton color="gray.700" />

              <ModalBody pb={6} mt={1}>
                <VStack bg='white'>
                  <Stack direction="column" spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Insert the customer name</Text>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={filters.user}
                      onChange={e => setFilters({ ...filters, user: e.target.value })}
                    />
                  </Stack>

                  <Stack direction="column" mt={1} spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Select month</Text>
                    <Select value={filters.month} onChange={e => setFilters({ ...filters, month: e.target.value })}>
                      <option value=""></option>
                      <option value="january">January</option>
                      <option value="february">February</option>
                      <option value="march">March</option>
                      <option value="april">April</option>
                      <option value="may">May</option>
                      <option value="june">June</option>
                      <option value="july">July</option>
                      <option value="august">August</option>
                      <option value="september">September</option>
                      <option value="october">October</option>
                      <option value="november">November</option>
                      <option value="december">December</option>
                    </Select>
                  </Stack>

                  <Stack direction="column" mt={1} spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Select plan</Text>
                    <Select value={filters.plan} onChange={e => setFilters({ ...filters, plan: e.target.value })}>
                      <option value=""></option>
                      <option value="free">Free</option>
                      <option value="freeLimitedOnly">Free limited only</option>
                      <option value="classic">Classic</option>
                      <option value="enhanced">Enhanced</option>
                      <option value="master">Master</option>
                    </Select>
                  </Stack>

                  <Stack direction="column" mt={1} spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Select the method payment</Text>
                    <Select value={filters.methodPayment} onChange={e => setFilters({ ...filters, methodPayment: e.target.value })}>
                      <option value=""></option>
                      <option value="debitCard">Debit card</option>
                      <option value="creditCard">Credit card</option>
                    </Select>
                  </Stack>

                  <Stack direction="column" mt={1} spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Select status</Text>
                    <Select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                      <option value=""></option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </Stack>

                  <Stack direction="column" spacing={2} w={'full'} mt={1}>
                    <Text fontWeight={'bold'}>Insert the year</Text>
                    <Input
                      type="text"
                      placeholder="Year"
                      value={filters.year}
                      onChange={e => setFilters({ ...filters, year: e.target.value })}
                    />
                  </Stack>
                </VStack>
              </ModalBody>

              <ModalFooter gap={3}>
                <Button
                  colorScheme='gray'
                  color={'blue.500'}
                  _hover={{ backgroundColor: "gray.200" }}
                  fontSize="sm"
                  justifyContent="center"
                  alignItems="center"
                  size={'sm'}
                  onClick={() => {
                    setFilteredPayments(allPayments); setFilters({
                      user: '', plan: '', price: '', createdAt: '', month: '', year: '', status: '', methodPayment: ''
                    });
                  }}
                >
                  <HStack>
                    <Icon as={MdCleaningServices} fontSize="md" />
                    <Text>Reset Filter</Text>
                  </HStack>
                </Button>

                <Button
                  isLoading={isLoading}
                  color={'gray.50'}
                  _hover={{ backgroundColor: "blue.200" }}
                  fontSize="sm"
                  justifyContent="center"
                  alignItems="center"
                  colorScheme='facebook'
                  size={'sm'}
                  onClick={handleSearch}
                >
                  <HStack>
                    <Icon as={BiSearchAlt2} fontSize="md" />
                    <Text>Search</Text>
                  </HStack>
                </Button>
              </ModalFooter>
            </ModalContent>
            <ToastContainer />
          </Modal>

          <Footer />
        </Flex>
      ) : (
        navigate('/')
      )}
    </>
  );
}

