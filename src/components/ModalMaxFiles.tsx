import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react";
import React from "react";
import "react-toastify/ReactToastify.min.css";

interface ModalMaxFilesProps {
  isOpen: boolean;
  onClose: () => void;
  selectPlan: () => void;
  title: string;
}

export default function ModalMaxFiles({ isOpen, onClose, selectPlan, title }: ModalMaxFilesProps) {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.700">Which plan will you select?</ModalHeader>
        <ModalHeader color="blue.400" fontSize={'md'}>{title}</ModalHeader>
        <ModalCloseButton color="gray.700" />

        <ModalFooter gap={3} justifyContent={'center'} alignItems={'center'}>
          <Button onClick={onClose} bg="red.300" color={'white'}>Get with this plan</Button>
          <Button bg='blue.300' color={'white'} mr={3} onClick={selectPlan}>
            Select other plan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}