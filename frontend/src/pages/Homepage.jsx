import React, { useState } from "react";
import Navbar from "../component/home/navbar/Navbar";
import CategoryLinks from "../component/home/categoryLinks/CategoryLinks";
import Carousel from "../component/home/carousel/Carousel";
import MovieCard from "../component/home/movieCard/MovieCard";
import Footer from "../component/home/footer/Footer";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Store the search term

  const handleSearch = (term) => {
    setSearchTerm(term); // Update search term
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
      <CategoryLinks />
      <Carousel />
      
      {/* Pass searchTerm to MovieCard */}
      <MovieCard searchTerm={searchTerm} />
      <Footer/>
    </div>
  );
};

export default Homepage;
