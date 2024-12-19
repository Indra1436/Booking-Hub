import axios from "axios";

function movieAPI() {
    // Fetches trending movies and returns the resulting promise
    return axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=41c953dc7d1c21d27df7b693e9740a3c")
        .then(response => response.data) 
        .catch(error => {
            console.error("Error fetching movies:", error);
            throw error; 
        });
}

export default movieAPI;
