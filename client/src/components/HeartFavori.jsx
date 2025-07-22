import { useState } from "react";


//const Heart = "❤️";
const HeartFavori = ({ onClick }) => {
  const [isClick, setClick] = useState(false);
  const handleClick = () => {
    setClick(!isClick);
    if (onClick) onClick();
  };
  return (
    <span className="heart" onClick={handleClick}>
      {isClick ? "❤️" : "🤍"}
    </span>
  );
};  

export default HeartFavori;

