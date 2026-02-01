import React, { useState, useEffect } from "react";
import "./gallery.css";
import GalleryCard from "./gallerycard";

const Gallery = () => {
  const [images, setImages] = useState([
    {id:1, src:"/sample1.jpg"},
    {id:2, src:"/sample2.jpg"},
    {id:3, src:"/sample3.jpg"},
    {id:4, src:"/sample4.jpg"},
  ]);
  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lifelog_gallery"));
    if (saved) setImages(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lifelog_gallery", JSON.stringify(images));
  }, [images]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImages([
        { id: Date.now(), src: reader.result },
        ...images,
      ]);
    };
    reader.readAsDataURL(file);
  };
  const handleDelete=()=>{
    setImages((prev)=>prev.filter((img)=>img.id!==images[0].id));
  }
  return (
    <div className="gallery-page">
      <h1 className="gallery-title">My Gallery </h1>

      <label className="upload-btn">
        + Add Memory
        <input type="file" accept="image/*" onChange={handleUpload} hidden />
      </label>

      <div className="gallery-grid">
      {images.map((img, index) => (
        <GalleryCard
          key={img.id}
          image={img}
          size={index % 6}
          onDelete={handleDelete}
        />
        ))}
        
      </div>
    </div>
  );
};

export default Gallery;
