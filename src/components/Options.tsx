import { Button, HStack } from "@chakra-ui/react";

interface OptionsProps{
    nameButton1: string
    nameButton2: string
    bgColorActived: string
    colorActived: string
    onClickActived: () => void
    bgColorDesabled: string
    colorDesabled: string
    onClickDesabled: () => void
}

export default function Options({nameButton1, nameButton2, bgColorActived, colorActived, onClickActived, bgColorDesabled, colorDesabled, onClickDesabled} : OptionsProps){
    return(
        <HStack bg='gray.100' justifyContent={'center'} alignItems={'center'} p={1} spacing={0.5}>
            <Button
                bg={bgColorActived} 
                color={colorActived}
                _hover={{ backgroundColor: "gray.300" }}                                              
                fontSize="sm" 
                justifyContent="center"
                alignItems="center"
                onClick={onClickActived} 
                size='sm'
            >
                {nameButton1}
            </Button> 

            <Button
                bg={bgColorDesabled} 
                color={colorDesabled} 
                _hover={{ backgroundColor: "gray.300" }}                                            
                fontSize="sm" 
                justifyContent="center"
                alignItems="center"
                onClick={onClickDesabled} 
                size='sm'
            >
                {nameButton2}
            </Button> 
        </HStack> 
    )
}

