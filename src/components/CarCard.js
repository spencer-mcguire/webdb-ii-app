import React from "react";
import {
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/core";

import axios from "axios";

export const CarCard = props => {
  const {
    id,
    make,
    model,
    mileage,
    vin,
    transmission_type,
    status_of_title
  } = props.data;
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const deleteCar = () => {
    axios
      .delete(`https://webdb-ii-server.herokuapp.com/api/cars/${id}`)
      .then(res => {
        console.log(res);
        props.statusHelper();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="cards">
      <p>Inventory number : {id}</p>
      <p>Make : {make}</p>
      <p>Model : {model}</p>
      <p>Mileage : {mileage}</p>
      <p>VIN :{vin}</p>
      {transmission_type === "" || null ? (
        <p> Transmission : N/A </p>
      ) : (
        <p> Transmission : {transmission_type}</p>
      )}
      {status_of_title === "" || null ? (
        <p> Title : N/A </p>
      ) : (
        <p>Title : {status_of_title}</p>
      )}
      <IconButton
        onClick={() => setIsOpen(true)}
        variant="outline"
        variantColor="teal"
        aria-label="Delete Car"
        icon="delete"
      />
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variantColor="red"
                onClick={() => {
                  onClose();
                  deleteCar();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </div>
  );
};
