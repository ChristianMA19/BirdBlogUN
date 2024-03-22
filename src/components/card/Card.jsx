import "./Card.css";

// eslint-disable-next-line react/prop-types
const Card = ({title, imgurl, desc, name, author, date}) => {
  return (
    <div>
      <div className="title">{title}</div>
      <div className="img">
        <img src={imgurl} alt="" />
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
