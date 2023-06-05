import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import styles from "../Homepage/Homepage.module.scss";
import { myFavorite, updateMovie } from "../../apis/movieApi";
import Article from "../Homepage/components/Article/Article";

export default function Profile() {
  const { user } = useContext(AuthContext);

  // retour un tableau des filmé liké s'il est remplit
  const [myFav, setMyFav] = useState([]);
  const [articles, setArticles] = useState([]);

  // l'essentiel de ce code, et une grosse copie du homepage.
  // La différence se fait sur la selection des film liké depuis la table favorite
  useEffect(() => {
    async function getFav() {
      try {
        // on envoie le user pour matcher avec la table favorite
        const favorite = await myFavorite(user);
        setMyFav(favorite);
      } catch (error) {
        console.error(error);
      }
    }
    getFav();
  }, []);

  // cet fonction repette le updataArticles du Homepage et la fonction précendente pour rendre la page dynamique
  async function updateArticles(data) {
    const updatedOneMovie = await updateMovie(data);
    setArticles(
      articles.map((a) =>
        a.idMovies === updatedOneMovie.idMovies ? updatedOneMovie : a
      ))
      const favorite = await myFavorite(user);
      setMyFav(favorite);
  }

  return (
    <div className="flex-fill d-flex flex-column container p20">
      <div
        className={`card flex-fill d-flex flex-column mb20 p20 ${styles.contentCard}`}
      >
        <div>
          <h1>{user.pseudo}</h1>
        </div>
        <div className={`${styles.grid}`}>
          {myFav && myFav.length > 0 ? (
            <>
              {myFav.map((a, i) => (
                <Article key={i} movie={a} updateMovie={updateArticles} />
              ))}
            </>
          ) : (
            <h2>Vous n'avez pas encore de films favoris</h2>
          )}
        </div>
      </div>
    </div>
  );
}
