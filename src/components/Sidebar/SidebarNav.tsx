import { Box, Button, FormLabel, Input, Radio, RadioGroup, Select, Stack, VStack, Text, Heading, HStack } from '@chakra-ui/react'
import SliderTooltip from '../Slider';
// import React from 'react';


export function SidebarNav(){  
    
    // const firstField = React.useRef()

    return(
        <Stack spacing="5" align="flex-start" borderWidth='1px' p={4} bg='white' w={'100%'}>
            <Heading fontSize='md'textAlign={'center'} alignItems={'center'} w='100%'>
                CHARTER SEARCH
            </Heading>

            <Box w='100%'>
                <Input
                    // ref={firstField}
                    id='username'
                    placeholder='Search your boat...'
                    mt={5}
                />
            </Box>

            <RadioGroup defaultValue='1'>
                <FormLabel htmlFor='typeboat'>Type Boat</FormLabel>
                <Stack spacing={4} direction='row'>
                    <Radio value='1'>Motor</Radio>
                    <Radio value='2'>Sailing</Radio>
                </Stack>
            </RadioGroup>

            <FormLabel htmlFor='slider'>Number of Guests</FormLabel>
            <SliderTooltip/>

            <Box w='100%'>
                <FormLabel htmlFor='location'>Location</FormLabel>
                <Select id='location' defaultValue='brazil'>
                    <option value='brazil'>Brazil</option>
                    <option value='usa'>USA</option>
                    <option value='england'>England</option>
                    <option value='mexico'>Mexico</option>
                </Select>
            </Box>

            <FormLabel htmlFor='slider'>Price</FormLabel>
            <SliderTooltip/>

            <FormLabel htmlFor='slider'>Lenght of Boat</FormLabel>
            <SliderTooltip/>

            <HStack 
                justifyContent='space-between' 
                alignItems='center' 
                my={5}
                w='100%'
            >
                <VStack>
                    <Text fontSize='2xl' fontWeight='bold' color='gray.500'>158/200</Text>
                    <Text fontSize='md' color='gray.500'>Boats available</Text>                    
                </VStack>

                <Button colorScheme='facebook' size={'sm'}>See boats</Button>
            </HStack>
        </Stack>
    );
}



