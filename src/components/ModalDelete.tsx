import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react";
import React from "react";
import "react-toastify/ReactToastify.min.css";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  title?: string;
  isLoading?: boolean;
}

export default function ModalDelete({ isOpen, onClose, onClick, title, isLoading }: ModalDeleteProps) {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader color="gray.700">Are you sure you want delete this item?</ModalHeader>
        <ModalHeader color="blue.400" fontSize={'md'}>{title}</ModalHeader>
        <ModalCloseButton color="gray.700" />

        <ModalFooter gap={3} justifyContent={'center'} alignItems={'center'}>
          <Button onClick={onClose} bg='blue.300' color={'white'}>Cancel</Button>
          <Button bg="red.300" color={'white'} mr={3} onClick={onClick} isLoading={isLoading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}