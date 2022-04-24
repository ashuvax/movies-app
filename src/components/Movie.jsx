import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Movie = (props) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = props;

  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => {
        if (res.data.Response === "False") {
          setError(res.data.Error);
          setLoading(false);
        } else {
          setMovie(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const style_img = {
    width: "300px",
    height: "300px",
    objectFit: "cover",
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        error
      ) : (
        <div className="container">
          <div className="row">
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt="poster" style={style_img} />
          </div>
          <div className="row">
            <h2>Rating:</h2>
            {movie.Ratings?.map((rating) => (
              <h4>
                {rating.Source} {rating.Value}
              </h4>
            ))}
          </div>
          <div className="row">
            <h2>Actors:</h2>
            <h4>{movie.Actors}</h4>
          </div>
          <div className="row">
            <h2>Description:</h2>
            <p>{movie.Plot}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
