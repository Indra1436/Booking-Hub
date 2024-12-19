import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const API_KEY = "41c953dc7d1c21d27df7b693e9740a3c";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovieDetails(response.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to fetch movie details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const backDropUrl = `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`;
  const genres = movieDetails.genres.map((genre) => genre.name).join(", ");
  const runtimeHours = Math.floor(movieDetails.runtime / 60);
  const runtimeMinutes = movieDetails.runtime % 60;
  const formattedRuntime = `${runtimeHours}h ${runtimeMinutes}m`;
  const releaseDate = new Date(movieDetails.release_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const rating = movieDetails.vote_average ? `${movieDetails.vote_average.toFixed(1)}/10` : "N/A";
  const votes = movieDetails.vote_count ? `${(movieDetails.vote_count / 1000).toFixed(1)}K` : "N/A";

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div className="main-container">
      <section className="section-container">
        <div className="backdrop" style={{ backgroundImage: `url(${backDropUrl})` }}>
          <div className="inner-container">
            <div className="image-container">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt="poster"
              />
            </div>
            <div className="details-container">
              <h1>{movieDetails.title}</h1>
              <div className="rating-container">
                <i className="bi bi-star-fill"></i>
                <span>{rating}</span>
                <span>({votes} Votes)</span>
              </div>
              <p className="movie-info">
                {formattedRuntime} | {genres} | {releaseDate}
              </p>
              <button id="bt" onClick={togglePopup}>
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="overview-container">
        <h3 className="overview-title">About Movie:</h3>
        <p className="overview-text">{movieDetails.overview}</p>
      </div>

      {/* Pop-Up Component */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="language-close-btn">
              <p>{movieDetails.title}</p>
              <button onClick={togglePopup} className="popup-close">
                ×
              </button>
            </div>
            <h5 className="heading">Select Language and Format</h5>

            {/* Language Selection */}
            <div className="popup-languages">
              <h5 className="formats-and-lang">Languages</h5>
              <div className="language-btn">
                {["Tamil", "Telugu", "English"].map((language) => (
                  <button
                    key={language}
                    className="language"
                    style={{
                      backgroundColor: selectedLanguage === language ? "lightblue" : "rgb(236, 243, 245)",
                      width: "20%",
                      margin: "5px 10px",
                      border: "none",
                      padding: "10px",
                      borderRadius: "50px",
                    }}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="popup-formats">
              <h5 className="formats-and-lang">Formats</h5>
              <div>
                {["2D", "3D", "4D"].map((format) => (
                  <button
                    key={format}
                    style={{
                      backgroundColor: selectedFormat === format ? "lightblue" : "rgb(236, 243, 245)",
                      width: "20%",
                      margin: "5px 10px",
                      border: "none",
                      padding: "10px",
                      borderRadius: "50px",
                    }}
                    onClick={() => setSelectedFormat(format)}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {/* Proceed to Booking */}
            <Link
              to="/bookTicket"
              state={{
                movieDetails, // Pass the movie details
                selectedLanguage,
                selectedFormat,
              }}
            >
              <button
              className="btn btn-primary"
                disabled={!selectedLanguage || !selectedFormat} // Disable if language or format is not selected
              >
                Proceed to Booking
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
