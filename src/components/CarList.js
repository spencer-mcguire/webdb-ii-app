import React, { useEffect, useState } from "react";
import axios from "axios";

import { CarCard } from "./CarCard";

export const CarList = ({ status, statusHelper }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("https://webdb-ii-server.herokuapp.com/api/cars")
      .then(res => {
        console.log(res);
        setCars(res.data);
      })
      .catch(err => console.log(err));
  }, [status]);

  return (
    <div className="main-container">
      <div className="card-container">
        {cars.map(i => (
          <CarCard key={i.id} data={i} statusHelper={statusHelper} />
        ))}
      </div>
    </div>
  );
};
