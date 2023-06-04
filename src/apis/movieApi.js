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
  console.log(page.user.idUser);
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

export async function getFav(data) {
  console.log(data);
  try {
    const response = await fetch(`${URL_API}/getFav?idMovie=${data.idM}&user=${data.idU}`);
    if (response.ok) {
      const fav = await response.json();
      return fav;
    }
  } catch (error) {
    console.error(error);
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