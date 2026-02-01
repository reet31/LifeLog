
import "./gallery.css";
const GalleryCard = ({ image, size,onDelete }) => {
  const sizes = [
    "small",
    "wide",
    "tall",
    "small",
    "big",
    "small",
  ];

  return (
    <div className={`gallery-card ${sizes[size]}`}>
      <img src={image.src} alt="memory" />
      <button 
      className="delete-btn" onClick={()=>onDelete(image.id)}>
        X

      </button>
    </div>
  );
};

export default GalleryCard;
