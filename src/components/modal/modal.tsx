import styles from "./modal.module.scss";

type modalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export const Modal = ({ isOpen, onClose, children }: modalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <span className={styles["close"]} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};
