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
  return (
    <div className={styles.contcont}>
      <div className={`${styles.container} ${backgroundColorClass}`}>
        <div className={styles.title}>{title}</div>
        <div className="imgcont">
          <img className={styles.img} src={imgurl} alt="img" />
        </div>
        <div className={styles.cardinfo}>
          <div className={styles.birdinfo}>
            <div className="name">Common Name: {name}</div>
            <div className="family">Family: {family}</div>
            <div className="order">Order: {order}</div>
            <div className="location">Location: {location}</div>
          </div>
          <div className={styles.desc}>
            <div className="desc">
              Description: <br />
              {desc}
            </div>
          </div>
        </div>
        <div className={styles.userinfo}>
          <div className="author">By: {author}</div>
          <div className="date"> {formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
