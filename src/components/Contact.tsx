import { Button, Icon, SimpleGrid, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import { TfiEmail } from "react-icons/tfi";
import { IoBoatOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../services/api";
import { BoatDataGlobal } from '../mock/motorYatchs';
import { toastApiResponse } from './Toast';
import { useNavigate } from 'react-router-dom';

import ModalContactSeller from './ModalContactSeller';

export default function Contact() {

  const navigate = useNavigate();
  const { id: boatId } = useParams<{ id: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allDataBoat, setAllDataBoat] = useState<BoatDataGlobal[] | undefined>();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userID, setUserID] = useState('');

  const boatCurrency = allDataBoat?.find((dataBoat) => dataBoat.id === boatId);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handlePhoneClick = () => {
    setPhone(boatCurrency?.phone || 'No phone number available');
  };

  async function fetchBoatDetails() {
    try {
      const response = await api.get(`/list_boat_by_id.php?id=${boatId}`);
      setEmail(response.data[0].email)
      setAllDataBoat(response.data);
      setUserID(response.data[0].user_id);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
    }
  };

  const handleBoatsByUserId = (userID: string) => {
    localStorage.setItem('userID', userID);  // Armazena o userID no localStorage
    navigate(`/listBoatByUser/${userID}`);
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchBoatDetails();
  }, [boatId]);

  return (
    <VStack
      bg="cyan.100"
      alignItems="center"
      justifyContent="space-between"
      w={isWideVersion ? "53%" : "95%"} 
      marginX="auto"
      py={5}
      mt={5}
      borderRadius={10}
    >
      <Text fontSize='24px' fontWeight='bold' textAlign={'center'}>Contact Seller:</Text>

      <SimpleGrid columns={{ base: 1, md: boatCurrency?.phone ? 3 : 2 }} spacing={5}>
        {/* <Link> */}
          <Button colorScheme='facebook' size={['xs', 'sm', 'md', 'lg']} w='auto' gap={2} onClick={() => handleBoatsByUserId(userID)}>
            <Icon as={IoBoatOutline} />
            <Text fontSize={['xs', 'sm', "md", "lg"]}>Seller Inventory</Text>
          </Button>
        {/* </Link> */}

        <Button colorScheme='facebook' size={['xs', 'sm', 'md', 'lg']} w='auto' gap={2} onClick={openModal}>
          <Icon as={TfiEmail} />
          <Text fontSize={['xs', 'sm', "md", "lg"]}>Email</Text>
        </Button>

        <ModalContactSeller
          isOpen={isModalOpen}
          onClose={closeModal}
          title='Contact the seller'
          email_owner_boat={email}
        />

        {boatCurrency?.phone ? (
          <Button colorScheme="facebook" size={['xs', 'sm', 'md', 'lg']} w='auto' gap={2} onClick={handlePhoneClick}>
            <Icon as={FaPhoneVolume} />
            <Text fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>
              {phone !== '' ? phone : 'Call Now'}
            </Text>
          </Button>
        ) : null}
      </SimpleGrid>
    </VStack>
  )
}