import Upload from '../upload'; // Adjust the path based on your project structure
import './Modal.css'; // Add styling for the modal

// eslint-disable-next-line react/prop-types
const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close_button" onClick={onClose}>
        </button>
        <Upload />
      </div>
    </div>
  );
};

export default Modal;
