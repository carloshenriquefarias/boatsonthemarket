import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { formatPriceWithCurrency } from "../helpers/changeCoin";

type ImageItem = { src: string; nameBoat?: string; price?: string, priceOrRequest?: string, typeCoin?: string };

type Props = {
  images?: string | ImageItem[];
  selectedItem?: number;
  height?: string | { base?: string; md?: string; lg?: string; xl?: string; '2xl'?: string };
  onImageClick?: (index: number) => void;
};

export default function CarouselSlider({ images = [], selectedItem, height, onImageClick }: Props) {
  const gradientBackground = 'linear-gradient(135deg, #00102c 0%, #00102c 50%,  #1a4971 60%, #225177 70%, #103153 90%)';
  const imageArray = typeof images === 'string' ? [{ src: images }] : images;
  const heightStyle = typeof height === 'object' ? height : { base: height };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      borderRadius={8}
      display="flex"
      alignItems="center"
    >
      {images.length > 0 ? (
        <Carousel
          infiniteLoop
          autoPlay
          showArrows={true}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          dynamicHeight={false}
          selectedItem={selectedItem}
        >
          {imageArray?.map((image, index) => (
            <Box key={index} position="relative" borderRadius={10} onClick={() => onImageClick?.(index)} bg='black'>
              <Image
                src={image.src}
                borderRadius={5}
                height={heightStyle}
                w="auto"
                objectFit="cover"
                display="-webkit-inline-box"
                style={{display: '-webkit-inline-box', width: 'auto'}}
              />
              <Box
                position="absolute"
                bottom={8}
                left={4}
                color="white"
                zIndex={1}
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                bg={gradientBackground}
                borderRadius={10}
                w={'auto'}
                h='auto'
                px='3'
                opacity={image.nameBoat && image.price ? 1 : 0}
              >
                <Text fontSize={['2xs', 'xs', 'md', "xl", "3xl"]} fontWeight="bold" color={'yellow.500'}>
                  {image.nameBoat}
                </Text>

                {image.priceOrRequest === '1' ?
                  <Text
                    fontSize={['2xs', 'xs', 'sm', "md", "2xl"]}
                    color={'gray.100'}
                    style={{ display: 'flex', alignItems: 'center' }}
                    gap={2}
                  >
                    Price on request
                  </Text>
                  :
                  <Text
                    fontSize={['2xs', 'xs', 'sm', "md", "2xl"]}
                    color={'gray.100'}
                    style={{ display: 'flex', alignItems: 'center' }}
                    gap={2}
                  >
                    Price: {formatPriceWithCurrency(image.typeCoin || 'DOLARS', image.price || '0')}
                  </Text>
                }
              </Box>
            </Box>
          ))}
        </Carousel>
      ) : (
        null
      )}
    </Flex>
  );
}
// function formatPriceWithCurrency(arg0: string, arg1: number) {
//   throw new Error("Function not implemented.");
// }

