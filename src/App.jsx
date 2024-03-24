import { useEffect, useState } from "react";
import Modal from "./components/modal"; // Adjust the path based on your project structure
import Card from "./components/card";
import styles from "./App.module.css";

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
    fetch("https://birdblogun-d42wh7ajma-vp.a.run.app/foroupload/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.hcont}>
          <img className={styles.img} src="https://cdn.discordapp.com/attachments/746881770762534912/1221598863052374197/robin.png?ex=66132999&is=6600b499&hm=7d7b8b577457c669024caa3797b61c7a1e95a7469e1c30509969a4415a920b63&" alt="Logo" />
        </div>
        <div className={styles.hcont}>
          <div className={styles.title}>BirdblogUN</div>
        </div>
        <div className={styles.hcont}>
          <button onClick={handleShowModal} className={styles.uploadB}>
            Upload ↑
          </button>
        </div>
      </div>
      {isModalVisible && <Modal onClose={handleCloseModal} />}

      <div className={styles.card_container}>
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.scientificName}
            imgurl={item.urlPhoto}
            desc={item.description}
            name={item.commonName}
            family={item.family}
            order={item.order}
            location={item.location}
            author={item.author}
            date={item.date}
          />
        ))}
      </div>
      <footer>
        <div>
          <div>Created by: David Tache Christian Manga Daniel Diaz</div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default App;
