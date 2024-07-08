import { useContext, useState } from "react";
import { Modal } from "../modal/modal";
import { CarContext } from "../car-list/car-list";

type DeleteCarItemProps = {
  id: number;
};

export const DeleteCarItem = ({ id }: DeleteCarItemProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { handleDeleteCar } = useContext(CarContext);

  const handleConfirm = () => {
    handleDeleteCar(id);
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <h3>Are you sure you want to delete this car?</h3>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={() => setShowConfirmation(false)}>No</button>
      </Modal>
    </>
  );
};
