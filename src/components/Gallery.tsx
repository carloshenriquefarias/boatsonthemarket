'use client'
import React, { useEffect, useState } from 'react';
import { Box, HStack, Image, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AppError } from '../utils/AppError';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.min.css';
import { BoatDataGlobal } from '../mock/motorYatchs';
import CarouselSlider from './CarouselSlider';

const ThumbnailCarousel: React.FC<{ images: string[]; onClick: (index: number) => void }> = ({
  images,
  onClick,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    onClick(index);
  };

  const newWidth = useBreakpointValue({ base: '25rem', md: '30rem', lg: '60rem' })

  return (    
    <HStack 
      spacing={0} 
      overflowX="scroll"  
      mx="auto" 
      style={{display: '-webkit-inline-box'}}
      maxWidth={newWidth}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          cursor="pointer"
          onClick={() => handleThumbnailClick(index)}
          mx={1}
          width="80px"
          height="50px"
          border={selectedImageIndex === index ? '4px solid darkblue' : 'none'}
        >
          <Image
            src={image}
            alt={`Thumbnail ${index}`}
            width="100%"
            height="100%"
            borderRadius="4px"
            objectFit="fill"
          />
        </Box>
      ))}
    </HStack>
  );
};

const Gallery: React.FC = () => {  
  const { id: boatId } = useParams<{ id: string }>();

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [allDataBoat, setAllDataBoat] = useState<BoatDataGlobal[] | undefined>([]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  async function fetchBoatDetails() {
    try {
      const response = await api.get(`/list_boat_by_id.php?id=${boatId}`);
      // setAllDataBoat(response.data[0].images);
      setAllDataBoat(response.data[0].images || []);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'It was not possible to access this boat. Please try again later...';

      toast.error(title, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }

  if (!allDataBoat) {
    return <div>This boat can not be found!</div>;
  }

  const baseUrl = "https://techsoluctionscold.com.br/api-boats/uploads/boats_images/";
  const imagesWithFullUrl = allDataBoat.map((image) => ({
    src: `${baseUrl}${image}`,
  }));

  useEffect(() => {
    fetchBoatDetails();
  }, [boatId]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 150 }}
      transition={{ duration: 0.8 }}
    >
      <SimpleGrid
        templateColumns={{ base: '1fr', md: '100%' }}
        columns={{ base: 1, md: 1 }}
        spacing={3}
        w={'100%'}
        height={'auto'}
        marginX="auto"
        maxWidth={1000}
      >
        <Box w={'auto'} h={'auto'} cursor={'pointer'} display={'-webkit-inline-box'}>
          <CarouselSlider 
            images={imagesWithFullUrl} 
            selectedItem={selectedImageIndex} 
            height={{ base: '25rem', md: '31rem', lg: '37rem' }}
          />
        </Box>
      </SimpleGrid>

      <HStack w="100%" mt={10} mb={5}>
        <ThumbnailCarousel 
          images={imagesWithFullUrl.map((image) => image.src)} 
          onClick={handleThumbnailClick} 
        />
      </HStack>
    </motion.div>
  );
};

export default Gallery;
