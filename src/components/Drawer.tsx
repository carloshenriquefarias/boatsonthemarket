import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, useDisclosure, Button, Stack, Box, FormLabel, Input, Select, RadioGroup,
    Radio, Text, VStack
} from '@chakra-ui/react';
import SliderTooltip from './Slider'

export default function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
        <>
            <Button 
                colorScheme='teal' 
                onClick={onOpen}
            >
            Create user
            </Button>
            
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        CHARTER SEARCH
                    </DrawerHeader>
        
                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <Input
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

                            <Box>
                                <FormLabel htmlFor='location'>Location</FormLabel>
                                <Select id='location' defaultValue='brazil'>
                                    <option value='brazil'>Brazil</option>
                                    <option value='usa'>USA</option>
                                    <option value='usa'>England</option>
                                    <option value='mexico'>Mexico</option>
                                </Select>
                            </Box>

                            <FormLabel htmlFor='slider'>Price</FormLabel>
                            <SliderTooltip/>
        
                            <FormLabel htmlFor='slider'>Lenght of Boat</FormLabel>
                            <SliderTooltip/>

                        </Stack>
                    </DrawerBody>
        
                    <DrawerFooter borderTopWidth='1px' bg='gray.500' justifyContent='space-between' alignItems='center'>
                        <VStack>
                            <Text fontSize='2xl' fontWeight='bold' color='white'>158/200</Text>
                            <Text fontSize='md' color='white'>Boats available</Text>                    
                        </VStack>

                        <Button colorScheme='facebook'>See boats</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}