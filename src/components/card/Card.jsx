import styles from "./Card.module.css";

// eslint-disable-next-line react/prop-types
const Card = ({title, imgurl, desc, name, family, order, location, author, date}) => {
  return (
    <div className={styles.contcont}>
    <div className={styles.container} >
      <div className="title">{title}</div>
      <div className="imgcont">
        <img className={styles.img} src={imgurl} alt="img" />
      </div>
      <div className="name">Common Name: {name}</div>
      <div className="family">Family: {family}</div>
      <div className="order">Order: {order}</div>
      <div className="location">Location: {location}</div>
      <div className="desc">Description: {desc}</div>
      <div className="author">By: {author}</div>
      <div className="date">Uploaded: {date}</div>
    </div>
    </div>
  );
};

export default Card;
