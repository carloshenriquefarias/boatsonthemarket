import { FormControl, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";

interface BasicInfoProps {
    value1: string;
    value2: string;
    value3: string;
    // onChange: () => void;
}

export default function BasicInfo({value1, value2, value3} : BasicInfoProps) {
    return(
        <VStack spacing={2}>
            <Heading>Give us the basic information about your boat</Heading>
            <Heading size='md'>You're one step closer to selling your boat.</Heading>

            <VStack w='50%' mt={5}>
                <FormControl>
                    <FormLabel>Dhiane e JR</FormLabel>
                    <Input
                        type='text'
                        name='input1'
                        value={value1}
                        // onChange={onChange}
                    />
                </FormControl>

                <FormControl mt={2}>
                    <FormLabel>Years</FormLabel>
                    <Input
                        type='text'
                        name='input2'
                        value={value2}
                        // onChange={onChange}
                    />
                </FormControl>

                <FormControl mt={2}>
                    <FormLabel>Make</FormLabel>
                    <Input
                        type='text'
                        name='input3'
                        value={value3}
                        // onChange={onChange}
                    />
                </FormControl>
            </VStack>
        </VStack>
    )
}