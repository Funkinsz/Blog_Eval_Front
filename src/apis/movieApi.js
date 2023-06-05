const URL_API = "/api/movies";

export async function getNumberMovies() {
  try {
    const response = await fetch(`${URL_API}/getMovies`);
    if (response.ok) {
      const numberMoviesFromAPI = await response.json();
      return numberMoviesFromAPI[0].count;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getMovies(page) {
  // page a maintenant le nombre de page généré depuis le front et l'utilisateur
  try {
    const response = await fetch(`${URL_API}/getMovies?&limit=${page.page * 6}&user=${page.user.idUser}`);
    if (response.ok) {
      const allMovie = await response.json();
      return allMovie;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getOneMovie(id) {
  try {
    const response = await fetch(`${URL_API}/getOneMovie/${id}`);
    if (response.ok) {
      const oneMovie = await response.json();
      console.log(oneMovie);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateMovie(updatedMovie) {
  console.log(updatedMovie);
  try {
    const response = await fetch(`${URL_API}/toggleLiked`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });
    if (response.ok) {
      const updateMovie = await response.json();
      return updateMovie;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function myFavorite(user) {
  try {
    const response = await fetch(`${URL_API}/myFav?&idUser=${user.idUser}`)
    if (response.ok) {
      const favorite = await response.json()
      console.log(favorite);
      return favorite
    }
  } catch (error) {
    console.error(error);
  }
}
