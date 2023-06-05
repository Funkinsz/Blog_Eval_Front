import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import styles from "../Homepage/Homepage.module.scss";
import s from "../Homepage/components/Article/Article.module.scss";
import { myFavorite, myMoviesFav } from "../../apis/movieApi";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [myFav, setMyFav] = useState([]);

  useEffect(() => {
    async function getFav() {
      try {
        const favorite = await myFavorite(user);
        setMyFav(favorite);
      } catch (error) {
        console.error(error);
      }
    }
    getFav();
  }, []);

  console.log(myFav.map((a) => a.nameMovies));
  return (
    <div className="flex-fill d-flex flex-column container p20">
      <div
        className={`card flex-fill d-flex flex-column mb20 p20 ${styles.contentCard}`}>
        <div>
          <h1>{user.pseudo}</h1>
        </div>
        <div className={`${styles.grid}`}>
          {myFav && myFav.length > 0 ?
            (myFav.map((a, i) => (
              <div className={`${s.article}`} key={i}>
                <div className={`${s.imgContainer}`}>
                  <img src={a.poster} alt="movie_poster" />
                </div>
                <div
                  className={`d-flex flex-column justify-content-between align-items-center ${s.title}`}>
                  <h3 className="mb10">{a.nameMovies}</h3>
                  <i className={`fas fa-heart mb10 ${a.isFav === 1 && "text-primary" }`}></i>
                </div>
              </div>
            )
            )) : (
                <h2>Vous n'avez pas encore de films favoris</h2>
            )}
        </div>
      </div>
    </div>
  );
}
