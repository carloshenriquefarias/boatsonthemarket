import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, 
  DrawerBody, VStack, useDisclosure, Icon, IconButton, Divider
} from '@chakra-ui/react'
// import Menu from '../Menu'
import { RiMenuLine} from "react-icons/ri";
import { FaHome, FaMoneyCheck, FaUserTie } from "react-icons/fa";
import { IoBoatSharp, IoBarChartSharp } from "react-icons/io5";
import { GiOrganigram } from "react-icons/gi";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { TbNews } from "react-icons/tb";
import { RiAdvertisementLine } from "react-icons/ri";
import { ImUserCheck } from "react-icons/im";
import { FaFileContract } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { GoPasskeyFill } from "react-icons/go";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

import { useNavigate } from 'react-router-dom';
import { BoxDefault } from '../BoxDefault';
import { useAuth } from '../../hooks/useAuth';

export function SideBarMenu() {
  
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useAuth();

  const navigate = useNavigate();

  function isValidUser(user: any) {
    return user !== null && user.id !== '' && user.name !== '' && user.email !== '';
  }

  function isNotValidUser(user: any): boolean {
    return user === null || user.id === '' || user.name === '' || user.email === '';
  }

  function handleClickGoHome() {
    navigate('/');
  }

  const handleClickGoListBoatByType = (boatType: string) => {
    localStorage.setItem('boatType', boatType);
    navigate('/listBoat');
  };

  function handleSelectListPlans() {
    navigate('/selectPlans');
  }

  function handleLogin() {
    { isValidUser(user) ? navigate('/registerBoatBasic') : navigate('/login'); }
  }

  function handleGoToDashboard() {
    { user && navigate('/dashboard') }
  }

  function handleGoToAdmin() {
    { user && navigate('/admin') }
  }

  function handleGoToPayments() {
    { user && navigate('/payments') }
  }

  function handleGoToNews() {
    { user && navigate('/news') }
  }

  // function handleGoToBoatNews() {
  //   navigate('/boatNews')
  // }

  function handleGoToAds() {
    navigate('/ads')
  }

  function handleGoToPlans() {
    navigate('/plans')
  }

  function handleClickGoAboutUs() {
    navigate('/aboutUs');
  }

  function handleClickGoUsers() {
    navigate('/users');
  }

  function handleClickAdsTerms() {
    navigate('/adsTerms');
  }

  return (
    <>
      <IconButton 
        aria-label='Open Navigation'
        icon={<Icon as={RiMenuLine}/>} 
        fontSize="24" 
        variant="unstyled"
        color='yellow.300' 
        onClick={onOpen}
        mr="2"
      />
   
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="white" pt="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Boats Menu</DrawerHeader>
            <VStack alignItems="center" justifyContent="center" mb={2}>
            <Divider w='88%'/>
            </VStack>
            <DrawerBody>
              <VStack alignItems="left" justifyContent="flex-start" h="10" mb={2}>
                <VStack spacing={2} alignItems="left" justifyContent="flex-start" >
                  <BoxDefault titleMenu='Home' icon={FaHome} onClick={handleClickGoHome}/>
                  <BoxDefault titleMenu='Boats for sale' icon={IoBoatSharp} onClick={() => handleClickGoListBoatByType('')}/>
                  <BoxDefault titleMenu='Sell my boats' icon={FaMoneyCheck} onClick={handleLogin}/>
                  <BoxDefault titleMenu='About us' icon={GiOrganigram} onClick={handleClickGoAboutUs}/>  
                  <BoxDefault titleMenu='Boat plans' icon={HiOutlineDocumentText } onClick={handleSelectListPlans}/> 
                  {isNotValidUser(user) && <BoxDefault titleMenu='Login' icon={FaUserTie} onClick={handleLogin}/>}
                  {isValidUser(user) && <BoxDefault titleMenu='Dashboard' icon={IoBarChartSharp} onClick={handleGoToDashboard}/>} 
                  {isValidUser(user) && <BoxDefault titleMenu='Admin' icon={GoPasskeyFill} onClick={handleGoToAdmin}/>}   
                  {isValidUser(user) && <BoxDefault titleMenu='Payments' icon={HiOutlineCreditCard} onClick={handleGoToPayments}/>}  
                  {isValidUser(user) && <BoxDefault titleMenu='News' icon={TbNews} onClick={handleGoToNews}/>} 
                  {isValidUser(user) && <BoxDefault titleMenu='Ads' icon={RiAdvertisementLine} onClick={handleGoToAds}/>} 
                  {isValidUser(user) && <BoxDefault titleMenu='All Plans' icon={HiOutlineClipboardDocument} onClick={handleGoToPlans}/>} 
                  {isValidUser(user) && <BoxDefault titleMenu='Users' icon={ImUserCheck} onClick={handleClickGoUsers}/>} 
                  {isValidUser(user) && <BoxDefault titleMenu='Ads Terms' icon={FaFileContract} onClick={handleClickAdsTerms}/>} 
                </VStack>
              </VStack>   
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}