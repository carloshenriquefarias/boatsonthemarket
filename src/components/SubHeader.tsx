import { VStack, Heading, HStack, Button, Box, Divider } from "@chakra-ui/react";
import { 
    // DrawerProvider, 
    useDrawerContext 
} from "../context/DrawerContext";
// import DrawerExample from "./Drawer";
import { useEffect, useState } from "react";
import Options from "./Options";
import Filter from "./Filter";

export default function SubHeader(){

    const { openDrawer } = useDrawerContext();
    const [selectedButton, setSelectedButton] = useState("ativado");

    function handleFilterEnabled() {
        setSelectedButton('ativado')
    }

    function handleFilterDisabled() {
        setSelectedButton('desativado');
    }


    useEffect(() => {
        openDrawer();
    }, []);
    
    return(
        <VStack width="70%" mb={5}> 

            <HStack justifyContent={'space-between'} alignItems={'center'} w='100%'>
                <Heading as='h4' size='md' color='gray.600'>184 YATCHS FOR CHARTER</Heading>

                <HStack bg='white' w='35%'>
                    <Options
                        nameButton1="Dolar"
                        nameButton2='Euro'
                        bgColorActived={selectedButton === "ativado" ? "gray.50" : "gray.100"} 
                        colorActived={selectedButton === "ativado" ? "gray.300" : "gray.400"}
                        onClickActived={() => handleFilterEnabled()}

                        bgColorDesabled={selectedButton === "desativado" ? "gray.50" : "gray.100"} 
                        colorDesabled={selectedButton === "desativado" ? "blue.500" : "gray.400"}
                        onClickDesabled={() => handleFilterDisabled()}
                    />

                    <Options
                        nameButton1="Motor"
                        nameButton2='Vela'
                        bgColorActived={selectedButton === "ativado" ? "gray.50" : "gray.100"} 
                        colorActived={selectedButton === "ativado" ? "gray.300" : "gray.400"}
                        onClickActived={() => handleFilterEnabled()}

                        bgColorDesabled={selectedButton === "desativado" ? "gray.50" : "gray.100"} 
                        colorDesabled={selectedButton === "desativado" ? "blue.500" : "gray.400"}
                        onClickDesabled={() => handleFilterDisabled()}
                    />
                   
                    <Button
                        bg={'gray.50'} 
                        color={'blue.500'}
                        _hover={{ backgroundColor: "gray.300" }}                                              
                        fontSize="sm" 
                        justifyContent="center"
                        alignItems="center"
                    >
                        Advanced Search
                    </Button> 
                </HStack>                
            </HStack>

            {/* <DrawerProvider>
                <div>
                    <button onClick={openDrawer}>Abrir Drawer</button>
                    <DrawerExample />
                </div>
            </DrawerProvider> */}


            <Box w="100%" mt={5}>
                <Divider borderColor="cyan.700" borderWidth='1.5px' ></Divider>
            </Box>

            <Filter/>
        </VStack>    
    )
}