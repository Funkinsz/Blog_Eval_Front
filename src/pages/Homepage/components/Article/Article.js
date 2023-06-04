import { useContext, useEffect, useState } from "react";
import styles from "./Article.module.scss";
import { AuthContext } from "../../../../context";
import { useNavigate } from "react-router-dom";
import { getFav } from "../../../../apis/movieApi";

export default function Article({ movie, updateMovie }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const data = {idM: movie.idMovies, idU: user.idUser}

  const [isLike, setIsLike] = useState("");

  function handleClick() {
    if (user === null) {
      navigate("/login");
    } else {
      updateMovie({
        user,
        ...movie,
        // liked: !movie.liked,
      });
    }
  }

  // useEffect(() => {
    // if (user) {
      async function getLike() {
        try {
          const isLiked = await getFav(data);
          setIsLike(isLiked);
        } catch (error) {
          console.error(error);
        }
      }
      getLike();
    // }
  // }, []);

  console.log(data);
  return (
    <div className={`${styles.article}`}>
      <div className={`${styles.imgContainer}`}>
        <img src={movie.poster} alt="movie_poster" />
      </div>
      <div
        className={`d-flex flex-column justify-content-between align-items-center ${styles.title}`}
      >
        <h3 className="mb10">{movie.nameMovies}</h3>
        <i
          onClick={handleClick}
          className={`fas fa-heart mb10 ${isLike ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}
