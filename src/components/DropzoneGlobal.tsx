import { useState } from 'react';
import { Box, Center, Container, Icon, IconButton, Text, Image, useColorModeValue} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { FaTrashCan, FaImage} from 'react-icons/fa6';

interface CustomFile extends File {
  preview: string;
}

const DropzoneGlobal = ({ onFilesChange, imagePrevious, typeCardAds }: any) => {
  const [files, setFiles] = useState<CustomFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png', '.jpg'],
      'text/html': ['.html', '.htm'],
    },
    onDrop: (acceptedFiles) => {
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    },
  });

  const removeFile = (fileToRemove: CustomFile) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <>
      <Center w='100%'>
        <Box
          {...getRootProps({ className: "dropzone" })}
          p={4}
          borderWidth={2}
          borderColor="blue.300"
          borderStyle="dashed"
          borderRadius="md"
          textAlign="center"
          w='100%'
          cursor={'pointer'}
        >
          <input {...getInputProps()} />
          <Icon as={FaImage} fontSize="5xl" color={'gray.300'} />
          <Text> Click here and select the main image</Text>
        </Box>
      </Center>

      <Box w="100%" mt={3}>
        <Text fontSize="sm" textAlign="center" fontWeight="thin">
          This is your main image! If you want to select another image, click on button above!
        </Text>
        <Box display="flex" flexWrap="wrap" justifyContent={'center'} alignItems={'center'}>
          {(imagePrevious && files.length === 0) ? (
            <>
              {(typeCardAds === 1) ? (
                <Box key={imagePrevious[0]} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
                  <Box position="relative">
                    <img 
                      src={imagePrevious} 
                      width="100%" 
                      height="100%" 
                    />
                  </Box>
                </Box>
              ) : (
                <Container p={{ base: 1, md: 1 }}>
                  <Box
                    cursor={'pointer'}
                    _hover={{ boxShadow: "0 0 0 5px cyan" }}
                    rounded="md"
                    overflow="hidden"
                    bg={useColorModeValue('white', 'gray.800')}
                    key={imagePrevious} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative"
                  >
                    <Box position="relative" borderRadius={10} overflow="hidden">
                      <Image
                        src={imagePrevious}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                        borderRadius="md"
                      />
                    </Box>
                  </Box>
                </Container>
              )}
            </>
          ) : (
            files.map((file) => (
              <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
                <IconButton
                  aria-label="Excluir"
                  bg="red"
                  size="sm"
                  onClick={() => removeFile(file)}
                  position="absolute"
                  top={2}
                  right={2}
                  zIndex={1}
                >
                  <Box color="white">
                    <FaTrashCan />
                  </Box>
                </IconButton>

                <Box position="relative">
                  {file.type?.startsWith('image/') ? (
                    <img src={file.preview} alt={file.name} width="100%" height="100%" />
                  ) : (
                    <div>File type not supported</div>
                  )}
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default DropzoneGlobal;
