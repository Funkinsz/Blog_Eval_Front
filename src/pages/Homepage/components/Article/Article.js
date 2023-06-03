import { useContext, useState } from "react";
import styles from "./Article.module.scss";
import { AuthContext } from "../../../../context";
import { useNavigate } from "react-router-dom";

export default function Article({ movie, updateMovie }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  function handleClick() {
    if (user === null) {
      navigate("/login");
    } else {
      updateMovie({
        ...movie,
        liked: !movie.liked,
      });
    }
  }

  console.log(movie);

  return (
    <div className={`${styles.article}`}>
      <div className={`${styles.imgContainer}`}>
        <img src={movie.poster} alt="movie_poster" />
      </div>
      <div
        className={`d-flex flex-column justify-content-between align-items-center ${styles.title}`}>
        <h3 className="mb10">{movie.nameMovies}</h3>
        <i
          onClick={handleClick}
          className={`fas fa-heart mb10 ${
            movie.isFav ? "text-primary" : ""
          }`}></i>
      </div>
    </div>
  );
}
