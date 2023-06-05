import Article from "./components/Article/Article";
import styles from "./Homepage.module.scss";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import SearchBar from "./components/SearchBar/SearchBar";
import { getMovies, getNumberMovies, updateMovie } from "../../apis/movieApi";
import { AuthContext } from "../../context";

export default function Homepage() {
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numberMovies, setNumberMovies] = useState(0);

  function isFiltering(value) {
    setIsSearching(value);
  }

  useEffect(() => {
    async function getDatas() {
      try {
        const numberMoviesFromAPI = await getNumberMovies();
        setNumberMovies(numberMoviesFromAPI);

        // j'ajoute user pour récupérer l'id de l'utilisateur afin d'ajouter le film dans la table favorite qui sera liée entre user et movies avec un boolean
        const movies = await getMovies({ page, user });
        setArticles(movies);
        if (numberMoviesFromAPI && movies) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      }
    }
    getDatas();
  }, [page]);

  async function updateArticles(updatedMovie) {
    console.log(updatedMovie);
    const updatedOneMovie = await updateMovie(updatedMovie);
    console.log(updatedOneMovie);
    setArticles(
      articles.map((a) =>
        a.idMovies === updatedOneMovie.idMovies ? updatedOneMovie : a
      )
    );
    // on rappelle la fonction getMovies présente dans le useEffect pour rendre la page dynamique apres un like
    const movies = await getMovies({ page, user });
    setArticles(movies);
  }

  return (
    <div className="flex-fill d-flex flex-column container p20">
      <h1 className="my30">Nos derniers articles</h1>
      <div
        className={`card flex-fill d-flex flex-column mb20 p20 ${styles.contentCard}`}
      >
        <SearchBar setSearch={setSearch} isFiltering={isFiltering} />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className={`${styles.grid}`}>
              {articles &&
                articles
                  .filter((a) => a.nameMovies.toLowerCase().startsWith(search))
                  .map((a, i) => (
                    <Article key={i} movie={a} updateMovie={updateArticles} />
                  ))}
            </div>
          </>
        )}

        {numberMovies && numberMovies !== articles.length && !isSearching && (
          <div className="d-flex justify-content-center align-items-center p20">
            <button
              onClick={() => setPage(page + 1)}
              className="btn btn-primary"
            >
              Plus de films ...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
