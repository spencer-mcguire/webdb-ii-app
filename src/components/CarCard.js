import React from "react";

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
  return (
    <div className="cards">
      <p>inventory number : {id}</p>
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
    </div>
  );
};
