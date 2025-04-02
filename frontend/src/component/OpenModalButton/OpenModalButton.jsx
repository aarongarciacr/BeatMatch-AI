import { useModal } from "../../context/Modal";

const OpenModalButton = ({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  classname,
}) => {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") {
      onButtonClick();
    }
  };

  return (
    <button onClick={onClick} className={classname}>
      {buttonText}
    </button>
  );
};

export default OpenModalButton;
