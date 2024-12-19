import React, { useState, useEffect } from 'react';

const images = [
  'https://assets-in.bmscdn.com/promotions/cms/creatives/1730799832000_novhazariwitharrahman1240x300.jpg',
  'https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg',
  'https://assets-in.bmscdn.com/promotions/cms/creatives/1730786710396_1240x300pkhyderabad.png',
  'https://assets-in.bmscdn.com/promotions/cms/creatives/1730799832000_novhazariwitharrahman1240x300.jpg'
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div className={`carousel-item ${index === currentIndex ? 'active' : ''}`} key={index}>
            <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
