import styles from "./Card.module.css";

// eslint-disable-next-line react/prop-types
const Card = ({title, imgurl, desc, name, author, date}) => {
  return (
    <div className={styles.container}>
      <div className="title">{title}</div>
      <div className="imgcont">
        <img className={styles.img} src={imgurl} alt="img" />
      </div>
      <div className="name">{name}</div>
      <div className="desc">
        {desc}
      </div>
      <div className="author">{author}</div>
      <div className="date">{date}</div>
    </div>
  );
};

export default Card;
