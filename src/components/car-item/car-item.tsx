import React, { useState } from "react";
import { Car } from "../../types/car";
import { CarEditItem } from "../edit-car-item/car-edit-item";
import { DeleteCarItem } from "../delete-car-item/delete-car-item";
import { CarMap } from "../car-map/car-map";

import styles from "./car-item.module.scss";

type CarItemProps = {
  car: Car;
};

export const CarItem: React.FC<CarItemProps> = ({ car }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className={styles["car-item"]}>
      <article>
        <h3>Name: {car.name}</h3>
        <h4>Model: {car.model}</h4>
        <p>Year: {car.year}</p>
        <p>Color: {car.color}</p>
        <p className={styles["car-item_price"]}>Price: {car.price}</p>
        <div>
          <DeleteCarItem id={car.id} />
          <CarEditItem
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            car={car}
          />
        </div>
      </article>
      <CarMap center={{ lat: car.latitude, lng: car.longitude }} />
    </li>
  );
};
