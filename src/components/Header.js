import React, { useState } from "react";
import axios from "axios";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast
} from "@chakra-ui/core";

export const Header = ({ statusHelper }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    mileage: 0,
    vin: "",
    transmission_type: "",
    status_of_title: ""
  });

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const handleChanges = e => {
    setNewCar({
      ...newCar,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://webdb-ii-server.herokuapp.com/api/cars", newCar)
      .then(res => {
        console.log(res);
        statusHelper();
        setNewCar(res.data);
        toast({
          title: "New Car Added.",
          description: "You have added a new car to the inventory.",
          status: "success",
          duration: 9000,
          isClosable: true
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="header-container">
      <header>
        <h1> Inventory </h1>
        <div className="button-container">
          <IconButton
            onClick={onOpen}
            variantColor="teal"
            aria-label="Add a car"
            size="lg"
            icon="add"
          />
        </div>
      </header>
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add A New Car</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Make</FormLabel>
                <Input
                  type="text"
                  name="make"
                  ref={initialRef}
                  placeholder="Make"
                  onChange={handleChanges}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Model</FormLabel>
                <Input
                  type="text"
                  name="model"
                  placeholder="Model"
                  onChange={handleChanges}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Mileage</FormLabel>
                <Input
                  type="text"
                  name="mileage"
                  placeholder="Mileage"
                  onChange={handleChanges}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>VIN</FormLabel>
                <Input
                  type="text"
                  name="vin"
                  placeholder="VIN Number"
                  onChange={handleChanges}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Transmission</FormLabel>
                <Input
                  type="text"
                  name="transmission_type"
                  placeholder="Type of Transmission"
                  onChange={handleChanges}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="status_of_title"
                  placeholder="Status of Title"
                  onChange={handleChanges}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variantColor="teal" mr={3} onClick={handleSubmit}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
