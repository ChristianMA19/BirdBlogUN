/* eslint-disable react/prop-types */

import styles from "./Info.module.css"; // Add styling for the modal

// eslint-disable-next-line react/prop-types
const Info = ({ onClose, data }) => {
  return (
    <div className={styles.info_overlay}>
      <div className={styles.info_content}>
          <button className={styles.close_button} onClick={onClose}>
          </button>
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
      </div>
    </div>
  );
};

export default Info;
