import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieLibrary = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="movie-library">
      {movies.map(movie => (
        <div key={movie.id} className="movie-item">
          <img src={movie.thumbnail} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieLibrary;
