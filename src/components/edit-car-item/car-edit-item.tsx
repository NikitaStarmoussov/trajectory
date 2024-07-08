import { useContext, useState } from "react";
import { Car } from "../../types/car";
import { Modal } from "../modal/modal";
import { CarContext } from "../car-list/car-list";

import styles from "./car-edit-item.module.scss";

type EditCarItemProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  car: Car;
};

export const CarEditItem: React.FC<EditCarItemProps> = ({
  isEditing,
  setIsEditing,
  car,
}) => {
  const [updatedCar, setUpdatedCar] = useState<Car | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { handleEditCar } = useContext(CarContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedCar((prevCar) => ({
      ...(prevCar || car),
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedCar(null);
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (updatedCar) {
      handleEditCar(updatedCar);
      setShowConfirmation(false);
      setUpdatedCar(null);
    }
  };

  return (
    <>
      <button onClick={handleEdit}>Edit</button>
      <Modal isOpen={isEditing} onClose={handleCancelEdit}>
        <form className={styles["car-edit-item__modal-form"]}>
          <h2>Edit Car</h2>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedCar?.name || car.name}
            onChange={handleChange}
          />
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={updatedCar?.model || car.model}
            onChange={handleChange}
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={updatedCar?.price || car.price}
            onChange={handleChange}
          />
          <div>
            <button onClick={handleConfirm}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <div>
          <h3>Are you sure you want to Update this car?</h3>
          <button onClick={handleSaveEdit}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      </Modal>
    </>
  );
};
