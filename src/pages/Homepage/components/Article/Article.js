import { useContext } from "react";
import styles from "./Article.module.scss";
import { AuthContext } from "../../../../context";
import { useNavigate } from "react-router-dom";

export default function Article({ movie, updateMovie }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  function handleClick() {
    // si l'utilisateur n'est pas connecter, il ne peut pas liké et sera rediriger vers la page de connexion
    if (user === null) {
      navigate("/login");
    } else {
      updateMovie({
        // ajout du user pour matcher dans la table favorite
        user,
        ...movie,
        liked: !movie.isFav,
      });
    }
  }

  return (
    <div className={`${styles.article}`}>
      <div className={`${styles.imgContainer}`}>
        <img src={movie.poster} alt="movie_poster" />
      </div>
      <div
        className={`d-flex flex-column justify-content-between align-items-center ${styles.title}`}
      >
        <h3 className="mb10">{movie.nameMovies}</h3>
        {movie && (
          <i
            onClick={handleClick}
            className={`fas fa-heart mb10 ${
              movie.isFav === 1 ? "text-primary" : ""
            }`}
          ></i>
        )}
      </div>
    </div>
  );
}
