/* eslint-disable react/prop-types */
import styles from "./Card.module.css";

// eslint-disable-next-line react/prop-types
const Card = ({
  title,
  imgurl,
  desc,
  name,
  family,
  order,
  location,
  author,
  date,
  inDanger,
  _id,
}) => {
  let backgroundColorClass;
  switch (inDanger) {
    case 0:
      backgroundColorClass = styles.dangerLevel0;
      break;
    case 1:
      backgroundColorClass = styles.dangerLevel1;
      break;
    case 2:
      backgroundColorClass = styles.dangerLevel2;
      break;
    default:
      backgroundColorClass = styles.defaultBackground;
      break;
  }

  const parsedDate = new Date(date);
  const formattedDate = `${parsedDate.getDate()}/${
    parsedDate.getMonth() + 1
  }/${parsedDate.getFullYear()}`;

  function sendreport() {
    alert(`Post ${title} with ID:${_id} reported`)
    fetch(`https://birdblogun-d42wh7ajma-vp.a.run.app/foroupload/${_id}`, {
      method: "PATCH",
    }).then(response => {
      window.location.reload();
    }).catch(error => {
      console.error("Error al enviar el reporte:", error);
    });
  }
  return (
    <div className={`${styles.contcont} ${backgroundColorClass}`}>
      <div className={styles.container}>
        <div className={styles.titlecont}>
          <div className={styles.blank}>‎‎‎</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.report} onClick={sendreport}></div>
        </div>
        <div className="imgcont">
          <img className={styles.img} loading="lazy" src={imgurl} alt="img" />
        </div>
        <div className={styles.cardinfo}>
          <div className={styles.birdinfo}>
            <div className="name">
              <span className={styles.textformat}>Common Name:</span> {name}
            </div>
            <div className="family">
              <span className={styles.textformat}>Family:</span> {family}
            </div>
            <div className="order">
              <span className={styles.textformat}>Order:</span> {order}
            </div>
            <div className="location">
              <span className={styles.textformat}>Location:</span> {location}
            </div>
          </div>
          <div className={styles.desc}>
            <div className="desc">
              <span className={styles.textformat}>Description:</span> <br />
              {desc}
            </div>
          </div>
        </div>
        <div className={styles.userinfo}>
          <div className="author">
            <span className={styles.textformat}>By:</span> {author}
          </div>
          <div className="date"> {formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
