import { useEffect, useState } from "react";
import Modal from "./components/modal"; // Adjust the path based on your project structure
import Card from "./components/card";
import styles from "./App.module.css";
import Info from "./components/info";

function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [data, setData] = useState([]);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleShowInfo = () => {
    setInfoVisible(true);
  };

  const handleCloseInfo = () => {
    setInfoVisible(false);
  };

  useEffect(() => {
    fetch("https://birdblogun-d42wh7ajma-vp.a.run.app/foroupload/")
      .then((response) => response.json())
      .then((data) => {
        data.reverse();
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.hcont}>
            <img
              className={styles.img}
              src="/src/assets/robin.png"
              alt="Logo"
            />
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

        
          <button onClick={handleShowInfo} className={styles.infoB}></button>
        
        {isModalVisible && <Modal onClose={handleCloseModal} />}
        {isInfoVisible && <Info onClose={handleCloseInfo} data={data} />}
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
              inDanger={item.inDanger}
              date={item.date}
              _id={item._id}
            />
          ))}
        </div>
        <footer>
          <div>
            <div className={styles.footer}>
              Created by: David Tache | Christian Manga | Daniel Diaz
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
