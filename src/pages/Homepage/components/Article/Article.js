import { useContext, useEffect, useState } from "react";
import styles from "./Article.module.scss";
import { AuthContext } from "../../../../context";
import { useNavigate } from "react-router-dom";
import { getFav } from "../../../../apis/movieApi";

export default function Article({ movie, updateMovie, getFav }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  let data;
  if (user) {
    data = { idM: movie.idMovies, idU: user.idUser };
  } else {
    data = { idM: movie.idMovies };
  }

  const [isLike, setIsLike] = useState([]);
  const [toggleLiked, setToggleLiked] = useState(false);
  
    // useEffect(() => {
    //   if (user) {
    //     async function getLike() {
    //       try {
    //         const isLiked = await getFav(data);
    //         setIsLike(isLiked);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     }
    //     getLike();
    //   }
    // }, []);

  function handleClick() {
    if (user === null) {
      navigate("/login");
    } else {
    setToggleLiked(!toggleLiked);
      updateMovie({
        user,
        ...movie,
      });
      getFav({user, ...movie})
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
        {movie && (
          <i
            onClick={handleClick}
            className={`fas fa-heart mb10 ${
              movie.isFav === 1 ? "text-primary" : ""
            }`}></i>
        )}
      </div>
    </div>
  );
}
