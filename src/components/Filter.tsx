import { Button, HStack, Icon, Text} from "@chakra-ui/react";
import { AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";

export default function Filter(){
    return(
        <HStack bg='white' justifyContent={'space-between'} alignItems={'center'} p={1} w='100%'>
            <Text>Sort</Text>

            <HStack justifyContent={'flex-end'} alignItems={'center'} w='80%' spacing={0}>
                <Button size={'sm'} bg={'white'} _hover={{ backgroundColor: "white" }} gap={1}>
                    <Text textColor={'gray.300'}>Price</Text>
                    <Icon as={AiOutlineArrowUp} />
                </Button>

                <Button size={'sm'} bg={'white'} _hover={{ backgroundColor: "white" }} gap={1}>
                    <Text textColor={'gray.300'}>Name</Text>
                    <Icon as={AiOutlineArrowDown} />
                </Button>

                <Button size={'sm'} bg={'white'} _hover={{ backgroundColor: "white" }} gap={1}>
                    <Text textColor={'gray.300'}>Type</Text>
                    <Icon as={AiOutlineArrowDown} />
                </Button>

                <Button size={'sm'} bg={'white'} _hover={{ backgroundColor: "white" }} gap={1}>
                    <Text textColor={'gray.300'}>Builder</Text>
                    <Icon as={AiOutlineArrowDown} />
                </Button>

                <Button size={'sm'} bg={'white'} _hover={{ backgroundColor: "white" }} gap={1}>
                    <Text textColor={'gray.300'}>Lenght</Text>
                    <Icon as={AiOutlineArrowDown} />
                </Button>

                <Button size={'sm'} bg={'white'} _hover={{ backgroundColor: "white" }} gap={1}>
                    <Text textColor={'gray.300'}>Year</Text>
                    <Icon as={AiOutlineArrowDown} />
                </Button>

                {/* <Button size={'sm'} bg={'white'} _hover={{ backgroundColor: "white" }} gap={1}>
                    <Text textColor={'gray.300'}>Rifit</Text>
                    <Icon as={AiOutlineArrowDown} />
                </Button> */}
            </HStack>            
        </HStack> 
    )
}