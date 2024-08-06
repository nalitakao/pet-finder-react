import Modal from "react-modal";
import PetForm from "./PetForm";

const EditPetModal = ({ pet, onCancel, onSave }) => {
  return (
    <Modal isOpen={true} onRequestClose={onCancel}>
      <h2>Editing {pet.name}</h2>
      <PetForm pet={pet} onCancel={onCancel} onSave={onSave} />
    </Modal>
  );
};

export default EditPetModal;