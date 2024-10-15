import { useState } from "react";
import { Box, Center, Text, UnorderedList, ListItem, VStack, IconButton } from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
interface CustomFile extends File {
  preview: string;
}

export default function Dropzone () {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    maxFiles: 5,
    // implementando tipo de arquivos aceitos
    accept: {
      "image/png": [".png", ".jpg"],
      "text/html": [".html", ".htm"],
    },
    onDrop: (acceptedFiles) => {
      const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <ListItem key={file.name}>{file.name}</ListItem>
  ));

  const fileRejectionItems = fileRejections.map(({ file }) => {
    return <ListItem key={file.name}>{file.name}</ListItem>;
  });

  const removeFile = (fileToRemove: CustomFile) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
  };

  const Preview = files.map((file) => (
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
        {file.type.startsWith("image/") ? (
          <img src={file.preview} alt={file.name} width="100%" height="100%" />
        ) : (
          <iframe src={file.preview} title={file.name} width="100%" height="300px" />
        )}
      </Box>
    </Box>
  )); 

  return (
    <VStack spacing={4}>
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
          <Text> Drop some files and photos here or click to select files...</Text>
        </Box>
      </Center>

      <Box display="flex" justifyContent="center" alignItems="center" w='100%'>
        <Box w="50%" px={2} borderRightWidth={1} borderColor="gray.300">
          <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>Accepted Files</Text>
          <UnorderedList color={'blue.300'} mt={1}>{acceptedFileItems}</UnorderedList>
        </Box>
        <Box w="50%" px={2}>
          <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>Rejected Files</Text>
          <UnorderedList color={'red.300'} pl={2} mt={1}>{fileRejectionItems}</UnorderedList>
        </Box>
      </Box>

      <Box w="100%">
        <Text fontSize="lg" fontWeight="bold">Files Preview</Text>
        <Box display="flex" flexWrap="wrap">
          {Preview}
        </Box>
      </Box>
    </VStack>
  );
};




