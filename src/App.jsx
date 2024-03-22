import { useEffect, useState } from "react";
import Modal from "./components/modal"; // Adjust the path based on your project structure
import Card from "./components/card";

function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div>
        <button onClick={handleShowModal}>Show Upload</button>
      </div>
      {isModalVisible && <Modal onClose={handleCloseModal} />}

      <div className="card-container">
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.scientificName}
            imgurl={item.urlPhoto}
            desc={item.description}
            name={item.commonName}
            author={item.author}
            date={item.date}
          />
        ))}
      </div>
    </>
  );
}

export default App;
