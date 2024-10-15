'use client'

import {
  Flex, Text, Box, Avatar, Button, HStack, Icon, Link,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider, Center, useBreakpointValue,
  VStack
} from '@chakra-ui/react'
  ;
import { useAuth } from '../hooks/useAuth';
import { FaUserEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {

  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  // console.log('o usuario e:', user);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handleEditMyProfile() {
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/editprofile');
  }

  function GoToDashboard() {
    signOut();
    navigate('/');
  }

  return (
    <Flex align="center">
      {isWideVersion && (
        <>
          {showProfileData && (
            <Box mr="4" textAlign="right" w={'auto'}>
              {user && (
                <VStack w={'10rem'} align="flex-end" spacing={0}>
                  <Text color="gray.100" fontWeight="bold" fontSize={['2xs', 'xs', 'sm', "md", "lg"]}>
                    Welcome
                  </Text>
                  <Text color="gray.100" fontWeight="bold" fontSize={['2xs', 'xs', 'sm']}>
                    {user.name}
                  </Text>
                  <Text color="gray.100" fontSize="small">
                    {user.email}
                  </Text>
                </VStack>
              )}
            </Box>
          )}
        </>
      )}

      <Menu>
        <HStack>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar size={'md'} src={`https://techsoluctionscold.com.br/api-boats/uploads/${user?.photo_filename}`} />
          </MenuButton>
          <Icon as={IoIosArrowBack} fontSize="xl" color={'white'} cursor={'pointer'} />
        </HStack>

        <MenuList alignItems={'center'}>
          <Center>
            <Avatar
              size={'xl'}
              src={`https://techsoluctionscold.com.br/api-boats/uploads/${user?.photo_filename}`}
            />
          </Center>

          <Center mt={2}>
            <Text
              color={'blue.300'}
              fontWeight='bold'
              fontSize='xl'
              mt='5px'
            >
              {user !== null && user.name}
            </Text>
          </Center>

          <Center>
            <Text
              color={'blue.300'}
              fontWeight='thin'
              fontSize='sm'
            >
              {user !== null && user.email}
            </Text>
          </Center>

          <MenuDivider />

          <MenuItem
            bg={'gray.50'}
            w='full'
            color={'blue.300'}
            _hover={{ backgroundColor: "gray.100" }}
            fontSize="sm"
            justifyContent="flex-start"
            alignItems="center"
            onClick={handleEditMyProfile}
            mb={2}
          >
            <HStack>
              <Icon as={FaUserEdit} fontSize="2xl" />
              <Text>Edit profile</Text>
            </HStack>
          </MenuItem>

          <Link href="/">
            <MenuItem
              bg={'gray.50'}
              w='full'
              color={'blue.300'}
              _hover={{ backgroundColor: "gray.300" }}
              fontSize="sm"
              justifyContent="flex-start"
              alignItems="center"
              onClick={GoToDashboard}
            >
              <HStack w='full'>
                <Icon as={SlLogout} fontSize="xl" />
                <Text>Logout boats</Text>
              </HStack>
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Flex>
  );
}