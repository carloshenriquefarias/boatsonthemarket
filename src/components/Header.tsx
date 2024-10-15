'use client'
import { Text, Button, Center, Divider, Flex, HStack, Icon, Link, VStack, useBreakpointValue 
} from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DrawerProvider, useDrawerContext } from '../context/DrawerContext';
import { FaUserCircle } from "react-icons/fa";
import { Logo } from './Logo';
// import { motion } from "framer-motion";
import { Profile } from './Profile';
import { SideBarMenu } from './Sidebar/SidebarMenu';

import Menu from './Menu'

export default function Header() {

  const { openDrawer } = useDrawerContext();
  const { user } = useAuth();

  const navigate = useNavigate();
  const gradientBackground = 'linear-gradient(135deg, #00102c 0%, #00102c 50%,  #1a4971 60%, #225177 70%, #103153 90%)';
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: false,
    xl: true,
  });

  function isValidUser(user: any) {
    return user !== null && user.id !== '' && user.name !== '' && user.email !== '';
  }

  function handleClickGoHome() {
    navigate('/');
  }

  function handleLogin() {
    navigate('/login')
  }

  useEffect(() => {
    openDrawer();
  }, []);

  return (
    <Flex
      bg={gradientBackground}
      w="100%"
      h={isWideVersion ? ('11rem') : ('9rem')}
      align="center"
      marginX="auto"
      px="6"
    >
      <VStack
        w="100%"
        h={isWideVersion ? ('11rem') : ('9rem')}
      >       
        {/* <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 150 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
        > */}
          <HStack
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            h="4rem"
            mt={8}
            maxWidth={1480}
          >
            <HStack alignItems="center" justifyContent="flex-start" w="100%" h="10" maxWidth={1480}>             
              {isWideVersion ? (
                <>
                </>
                ) : (
                  <DrawerProvider>
                    <SideBarMenu />
                  </DrawerProvider>
                )
              }

              <Link onClick={handleClickGoHome}>
                <Logo />
              </Link>   
            </HStack>       
                       
            {/* {isWideVersion && <SearchBox />} */}

            {isValidUser(user) ? (<Profile />) : (
              <Button bg='blue.200' w='auto' h={isWideVersion ? '65px': '55px'} onClick={handleLogin}>
                <HStack pt={0}>
                  <Icon as={FaUserCircle } color={'gray.100'} h='28px' w='28px' />
                  <Text color={'gray.100'} fontSize={['2xs', 'xs', 'sm', 'md']}>Login</Text>
                </HStack>
              </Button>
            )}
          </HStack>          
        {/* </motion.div> */}

        <Center
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          mt={1}
          h="10px"
          // pr={10}
          maxWidth={1480}
        >
          <Divider borderColor="gray.400" alignItems="center" justifyContent="center"></Divider>
        </Center>

        {isWideVersion && (
          <HStack alignItems="center" justifyContent="center" h="12px" my={4}>
            <HStack spacing={6}>
              <Menu color='gray.100' />
            </HStack>
          </HStack>
        )}
      </VStack>
    </Flex>
  )
}