import React, { useRef } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ images, setImages }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="image-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      <div className="image-preview-grid">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image} alt={`Preview ${index + 1}`} />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="remove-image"
            >
              Remove
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="add-image-btn"
        >
          <span>Add Image</span>
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
