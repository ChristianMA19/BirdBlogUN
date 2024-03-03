import { useState } from 'react';
import Modal from './components/modal'; // Adjust the path based on your project structure

function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div>
        <button onClick={handleShowModal}>Show Upload</button>
      </div>

      {isModalVisible && <Modal onClose={handleCloseModal} />}
    </>
  );
}

export default App;



