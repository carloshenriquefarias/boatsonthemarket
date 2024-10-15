import { Button, HStack, Text, Flex, Box, VStack} from '@chakra-ui/react';

type CardOfferProps = {
    image?: string;
    title: string;
    subtitle: string;
    description: string;
    onClick?: () => void;
    backgoundType?: 'normal' | 'effect' 
    show?: boolean;
};

export default function CardOffer({ show, title, subtitle, description, backgoundType = 'effect', onClick, image }: CardOfferProps) {
    return (
        <HStack alignItems="center" justifyContent="center">
            <Flex
                w={[50, 80, 130, 200]}
                h={[180, 200, 250]}
                align={'center'}
                justify={'center'}
                flexDir="column"
                flex="1"
                display="flex"
            >
                <Box
                    position="relative"
                    w="100%"
                    h="100%"
                >
                    <Box
                        backgroundImage={`url(${image})`}
                        backgroundSize="cover"
                        position="absolute"
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                    />

                    <Flex
                        w="100%"
                        h="100%"
                        maxWidth={200}
                        padding={8}
                        flexDir="column"
                        shadow="0 0 20px rgba(0, 0, 0, 0.05)"
                        position="absolute"
                        zIndex={2}
                        bg={backgoundType === 'effect' ? 'rgba(0, 16, 44, 0.65)' : 'blue.500'}   
                    >
                        <VStack h='100%'>
                            <VStack h='70%'>
                                <Text fontSize={['sm', "md", "xl"]} fontWeight="extrabold" >
                                    <Text as="span" color="yellow.300">
                                        {title}
                                    </Text>{" "}
                                    {" "}
                                    <Text as="span" color="white">
                                        {subtitle}
                                    </Text>
                                </Text>
                                
                                {show && (
                                    <Text fontSize="xs" color="gray.200" textAlign="left" mt={1}>
                                        {description}
                                    </Text>
                                )}
                            </VStack>

                            <Button size={['sm', "md", "md"]} onClick={onClick} bg="yellow.300" color="blue.400" mt={1} borderRadius={0} fontSize={['xs','sm', "md", "md"]} >
                                Get Offer now!
                            </Button>
                        </VStack>
                    </Flex>
                </Box>
            </Flex>
        </HStack>
    );
}


