import { Box, Image } from "@chakra-ui/react";

interface AdsProps {
    image: string;
    height: string;
}

export default function Ads({image, height}: AdsProps) {
    return(
        <Box
            bg="purple"
            w="100%"
            h={height}
            display="flex"
            // alignItems="center"
            // justifyContent="center"
        >
            <Image
                src={image}
                alt=""
                w="100%"
                maxH={500}
                objectFit="cover"
            />
        </Box>

    )
}