import React, { useState } from "react";
import { Spinner, Modal } from "react-bootstrap";
import Movie from "./Movie";
import image_not_found from "../images/image-not-found.svg";

const Movis = (props) => {
  const { movies, loading, error } = props;
  const [modalShow, setModalShow] = useState(false);
  const [modalShowNow, setModalShowNow] = useState("");

  const style_img = {
    width: "400px",
    height: "400px",
    objectFit: "cover",
  };
  const onclick = (imdbID) => {
    setModalShow(true);
    setModalShowNow(imdbID);
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <h1>
          {error}{" "}
          {error !== "Movie not found!"
            ? "Please enter more restricted parameters"
            : ""}
        </h1>
      ) : (
        movies.map((movie) => (
          <>
            <div
              className="movie"
              key={movie.imdbID}
              onClick={() => onclick(movie.imdbID)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : image_not_found}
                alt="poster"
                style={style_img}
              />
              <h3>{movie.Title.slice(0, 30)}</h3>
              <h4>{movie.Year}</h4>
            </div>
          </>
        ))
      )}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Movie id={modalShowNow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Movis;
