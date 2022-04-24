import React, { useState } from "react";
import Movies from "../components/Movies";
import axios from "axios";
const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onsubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    axios
      .get(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${form.a.value}&y=${form.y.value}`
      )
      .then((res) => {
        if (res.data.Response === "True") {
          setError(false);
          setMovies(res.data.Search);
          setLoading(false);
        } else {
          setError(res.data.Error);
          setLoading(false);
        }
      });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={onsubmit}>
          <input type="search" placeholder="Movie title" name="a" required />
          <input type="search" placeholder="year" name="y" />
          <select className="select" name="type">
            <option value="">Select</option>
            <option value="movie">movie</option>
            <option value="series">series</option>
            <option value="episode">episode</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="container">
        {movies.length > 0 ? (
          <Movies movies={movies} loading={loading} error={error} />
        ) : null}
      </div>
    </>
  );
};

export default Main;
