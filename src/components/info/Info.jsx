/* eslint-disable react/prop-types */

import styles from "./Info.module.css"; // Add styling for the modal

// eslint-disable-next-line react/prop-types
const Info = ({ onClose, data }) => {
  return (
    <div className={styles.info_overlay}>
      <div className={styles.info_content}>
        <button className={styles.close_button} onClick={onClose}></button>
        <div className={styles.information}>
          Total post : {data.length}
          <br />
          <div className={styles.colorinfo}>
            Card color information
            <span className={styles.dangerLevel0}>Out of danger</span>
            <span className={styles.dangerLevel1}>Danger</span>
            <span className={styles.dangerLevel2}>Extintc</span>
          </div>
        </div>
        <div className={styles.about}>
          This page was created to share knowledge about the birds in our city,
          including those we encounter in our daily lives.
          <br />
          Feel free to post any birds you discover and let us know about the
          variety of birds that live close to you!
          <br />
          <br />
          Created By:
          <br />
          David Tache - Christan Manga - Daniel Diaz - Nefer Medina
        </div>
      </div>
    </div>
  );
};

export default Info;
