import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ContextData } from "../../contextData/ContextData";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = () => {
  const { searchTerm } = useContext(ContextData); // Access context
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = "41c953dc7d1c21d27df7b693e9740a3c";

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY
        );
        setMovieData(response.data.results || []);
      } catch (error) {
        console.error("Network or API error:", error);
        setError("Failed to fetch movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = searchTerm
    ? movieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : movieData;

  return (
    <div className="mainContainer">
      <h2 className="pt-3 pl-4">Currently Playing</h2>
      <div className="movieCard-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {filteredMovies.length === 0 && !isLoading && !error && (
          <p>No movies found. Try searching again.</p>
        )}
        {filteredMovies.map((movie) => { 
          console.log(movie)
          return (
          <div key={movie.id} className="movieCard">
            <Link to={`/movieDetails/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
            <div className="movieCard-details">
              <h4>Name: {movie.title}</h4>
              <p> Release Date: {movie.release_date || "Not Available"}</p>
              <p> Rating: {movie.vote_average}</p>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default MovieCard;
