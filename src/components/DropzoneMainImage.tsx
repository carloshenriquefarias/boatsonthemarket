import { useEffect, useState } from 'react';
import { Box, Center, Icon, IconButton, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { FaTrashCan } from 'react-icons/fa6';
import { IoIosBoat } from "react-icons/io";

interface CustomFile extends File {
  preview: string;
}

const DropzoneMainImage = ({ onFilesChange, imagesBoat }: any) => {
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

      console.log('updatedFiles', updatedFiles)
      console.log('updatedFiles', updatedFiles)
      onFilesChange(updatedFiles);
    },
  });

  const removeFile = (fileToRemove: CustomFile) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  useEffect(() => {
    console.log(imagesBoat, 'imagesBoat')
  }, [])

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
          <Icon as={IoIosBoat} fontSize="5xl" color={'gray.300'} />
          <Text> Add Here Your Main Image</Text>
        </Box>
      </Center>

      <Box w="100%" mt={3}>
        <Text fontSize="sm" textAlign="center" fontWeight="thin">
          If you want to select another image, click on button above!
        </Text>
        <Box display="flex" flexWrap="wrap">
          {(imagesBoat && files.length === 0) ? (
            <Box key={imagesBoat[0]} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
              <Box position="relative">
                <img src={'https://techsoluctionscold.com.br/api-boats/uploads/boats_images/' + imagesBoat[0]} width="100%" height="100%" />
              </Box>
            </Box>
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

export default DropzoneMainImage;
