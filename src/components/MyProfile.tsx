import {
  Text, useColorModeValue, Box, Input, SimpleGrid, Divider, FormControl, FormLabel,
  HStack, Button, VStack, Icon, Center, Avatar, Stack, useBreakpointValue,
  Switch
} from "@chakra-ui/react";

import Card from "./Card";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { FcOk } from "react-icons/fc";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { toastApiResponse } from "./Toast";

interface CustomFile extends File {
  preview: string;
}

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

export default function MyProfile() {

  const { user } = useAuth();
  const userIdCurrent = user && user.id ? user.id.toString() : '';
  // console.log('user 11:51', user);

  const navigate = useNavigate();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const bg = useColorModeValue("white", "navy.700");


  // const [userDataCurrent, setUserDataCurrent] = useState();
  const [userDataCurrent, setUserDataCurrent] = useState<User | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  console.log('user 11:51', userDataCurrent);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '', name: '', email: '', currentPassword: '', photo: '', newPassword: '', confirmPassword: '', typeUser: '',
  });

  const data = {
    id: user?.id.toString() ?? '',
    name: user?.name ?? '',
    email: user?.email ?? '',
    currentPassword: user?.password ?? '',
    newPassword: formData?.newPassword ?? '',
    confirmPassword: formData?.confirmPassword ?? '',
    photo: user?.photo_filename ?? '',
    typeUser: formData?.typeUser ?? '',
  };

  const fillFormWithData = () => {
    setFormData({
      id: data.id,
      name: data.name,
      email: data.email,
      currentPassword: data.currentPassword,
      newPassword: data?.newPassword ?? '',
      confirmPassword: data?.confirmPassword ?? '',
      photo: data.photo,
      typeUser: data?.typeUser ?? '',

    });
  };

  // const fetchDataUser = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await api.post('/user/list_all.php');
  //     const allUsers = response.data;

  //     const userData = allUsers.find((user: any) => user.id === userIdCurrent);
  //     setUserDataCurrent(userData);
  //     console.log('Dados do usuário:', userData);

  //   } catch (error) {
  //     console.error('Error:', error);
  //     toastApiResponse(error, 'It is not possible to list this user! Please try again!');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const toggleVideoInput = (event: any) => {
    setIsVideoEnabled(event.target.checked);
  };

  //Dropzone
  const [files, setFiles] = useState<CustomFile[]>([]);
  // console.log(files, 'files');
  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png", ".jpg"],
      "text/html": [".html", ".htm"],
    },
    onDrop: (acceptedFiles) => {
      const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);
    },
  });

  const Preview = files.map((file) => (
    <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
      <Box position="relative">
        {file.type.startsWith("image/") ? (
          <img src={file.preview} alt={file.name} width="100%" height="100%" />
        ) : (
          <iframe src={file.preview} title={file.name} width="100%" height="300px" />
        )}
      </Box>
    </Box>
  ));

  async function handleUpdateProfile() {
    try {
      setIsLoading(true);

      if (formData.newPassword === formData.currentPassword && formData.newPassword !== '') {
        toastApiResponse(null, 'The new password and the current password are the same! Please enter a different new password.');
        setIsLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toastApiResponse(null, 'The new password does not match the confirmation password. Please verify your passwords.', 'warning');
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);

      if (formData.newPassword !== '') {
        formDataToSend.append("password", formData.newPassword);
      }
      // formDataToSend.append("is_broker", formData.status);
      // formDataToSend.append("company_name", formData.company_name);
      // formDataToSend.append("broker_email", formData.broker_email);
      // formDataToSend.append("broker_phone", formData.broker_phone);
      // formDataToSend.append("company_address", formData.company_address);

      if (formData.photo) {
        const response = await fetch(formData.photo);
        const blob = await response.blob();
        const imageFile = new File([blob], 'photo.jpg', { type: blob.type });
        formDataToSend.append('photo', imageFile);
        // console.log('a imagem enviada e essa:', imageFile);
      }

      const response = await api.post('/user/update_by_id.php', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        toastApiResponse(response, response.data.message);
      } else {
        throw new Error('Fail to update profile');
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      navigate(`/dashboard`);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataUser = async () => {
    if (!userIdCurrent) {
      navigate('/dashboard');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/user/list_all.php');
      const allUsers = response.data;
      const userData = allUsers.find((u: User) => u.id === userIdCurrent);
      if (userData) {
        setUserDataCurrent(userData);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('It is not possible to list this user! Please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchDataUser();
  // }, [userIdCurrent, navigate]);

  // if (!userDataCurrent) {
  //   return null; // ou um spinner/loading indicator
  // }

  useEffect(() => {
    fillFormWithData();
    fetchDataUser();
  }, [user]);

  return (
    <>
      {user ? (
        <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={700}>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mt='5px'
            mb='5px'
          >
            Edit Profile
          </Text>

          <Text color={textColorSecondary} fontSize='md' me='26px' mb='15px'>
            Change your name, email, password and other informations about your account
          </Text>

          <Divider />

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={2}>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={5}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={2}>
                  {files.length === 0 ? (<Avatar src={`https://techsoluctionscold.com.br/api-boats/uploads/${user.photo_filename}`} />) : (
                    <VStack spacing={0}>
                      <Center w='80%'>
                        <Box
                          {...getRootProps({ className: "dropzone" })}
                          w="110px"
                          h="110px"
                          borderRadius="full"
                          // borderStyle="dashed"
                          // borderColor="blue.300"
                          // bg="gray.100"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          // borderWidth={2}
                          cursor={'pointer'}
                        >
                          <input {...getInputProps()} />
                          {Preview}
                        </Box>
                      </Center>
                    </VStack>
                  )}

                  {/* {errors.photo && typeof errors.photo.message === 'string' && (
          <FormErrorMessage fontSize={'xs'} justifyContent={'center'} textAlign={'center'} mt={5}>
            {errors.photo.message}
          </FormErrorMessage>
        )} */}
                  {/* </FormControl> */}

                  <Stack justifyContent={'flex-start'} alignItems={'flex-start'}>
                    <Text
                      color={textColorPrimary}
                      fontWeight='bold'
                      fontSize='lg'
                      textAlign={'left'}
                    >
                      {user.name}
                    </Text>

                    <Text
                      color={textColorPrimary}
                      fontWeight='thin'
                      fontSize='sm'
                      textAlign={'left'}
                    >
                      {user.email}
                    </Text>
                  </Stack>

                </HStack>

                <Button bg='blue.400' color={'white'} onClick={open} size={['xs', 'sm', 'md']}>
                  Change photo
                </Button>
              </HStack>
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='lg'
            >
              Basic information about you
            </Text>

            <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5}>
              <VStack mt={3}>

                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type='text'
                    name='name'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type='text'
                    name='email'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    isReadOnly
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Phone number</FormLabel>
                  <Input
                    type='text'
                    name='email'
                    variant='filled'
                    placeholder='Filled'
                    value={'99999-9999'}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </FormControl>

                <Divider mt={5} />

                <FormControl display="flex" alignItems="center" mt={2}>
                  <FormLabel htmlFor="video-switch" mb="0">
                    Are you a broker?
                  </FormLabel>
                  <Switch id="video-switch" onChange={toggleVideoInput} isChecked={isVideoEnabled} />
                </FormControl>

                {isVideoEnabled && (

                  <>
                    <FormControl mt={4}>
                      <FormLabel>Company name</FormLabel>
                      <Input
                        type="text"
                        name="typeUser"
                        value={'Amor e alegria company LTDA'}
                        onChange={(e) => setFormData({ ...formData, typeUser: e.target.value })}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Contact email</FormLabel>
                      <Input
                        type='text'
                        name='email'
                        // variant='filled'
                        placeholder='Filled'
                        value={'pazeamor@email.com'}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Phone number</FormLabel>
                      <Input
                        type='text'
                        name='email'
                        // variant='filled'
                        placeholder='Filled'
                        value={'99999-9999'}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Company address</FormLabel>
                      <Input
                        type='text'
                        name='email'
                        // variant='filled'
                        placeholder='Filled'
                        value={'Rua do amor e alegria para todes, Nº 1313'}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </FormControl>
                  </>
                )}


              </VStack>
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='lg'
            >
              Change password
            </Text>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={5}>
              <VStack mt={3}>
                {/* <FormControl>
                  <FormLabel>Current password</FormLabel>
                  <Input
                    type='text'
                    name='currentPassword'
                    variant='filled'
                    placeholder='Filled'
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  />
                </FormControl> */}

                <FormControl>
                  <FormLabel>New password</FormLabel>
                  <Input
                    type='password'
                    name='newPassword'
                    variant='outline'
                    placeholder='Insert your new password'
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    type='password'
                    name='confirmPassword'
                    variant='outline'
                    placeholder='Confirm your new password'
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </FormControl>
              </VStack>

              <HStack mt={3} justifyContent={'space-between'} alignItems={'center'}>
                <Stack justifyContent={'space-between'} alignItems={'flex-start'}>
                  <Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='lg'
                    textAlign={'left'}
                  >
                    Password requirements and suggestions:
                  </Text>

                  <Text
                    color={textColorPrimary}
                    fontWeight='thin'
                    fontSize='sm'
                    textAlign={'left'}
                  >
                    Please follow the instructions to create a new strong password
                  </Text>

                  <VStack px={1} pt={2} spacing={2} alignItems="flex-start">

                    <HStack spacing={3}>
                      <Icon as={FcOk} h={4} w={4} color="green.500" />
                      <Text fontSize="sm" color="gray.500">
                        One special characters
                      </Text>
                    </HStack>

                    <HStack spacing={3}>
                      <Icon as={FcOk} h={4} w={4} color="green.500" />
                      <Text fontSize="sm" color="gray.500">
                        Min 6 characters
                      </Text>
                    </HStack>

                    <HStack spacing={3}>
                      <Icon as={FcOk} h={4} w={4} color="green.500" />
                      <Text fontSize="sm" color="gray.500">
                        One number (2 are recommended)
                      </Text>
                    </HStack>

                    <HStack spacing={3}>
                      <Icon as={FcOk} h={4} w={4} color="green.500" />
                      <Text fontSize="sm" color="gray.500">
                        Change it often
                      </Text>
                    </HStack>

                  </VStack>
                </Stack>

                <Button bg='yellow.200' mb={5} onClick={handleUpdateProfile} isLoading={isLoading} top={20}>
                  {isWideVersion ? 'Update your information' : 'Update'}
                </Button>
              </HStack>
            </SimpleGrid>
          </Card>

          {/* <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={3}>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Stack justifyContent={'flex-start'} alignItems={'flex-start'}>
                  <Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='lg'
                    textAlign={'left'}
                  >
                    DELETE ACCOUNT
                  </Text>

                  <Text
                    color={textColorPrimary}
                    fontWeight='thin'
                    fontSize='sm'
                    textAlign={'left'}
                  >
                    Once you delete your account, there is no going back. Please be certain.
                  </Text>
                </Stack>

                <Button bg='red.400' color={'white'} onClick={handleUpdateProfile}>
                  {isWideVersion ? 'Delete account' : 'Delete'}
                </Button>
              </HStack>
            </SimpleGrid>
          </Card> */}
          <ToastContainer />
        </Card>
      ) : (
        navigate('/dashboard')
      )}
    </>
  );
}
