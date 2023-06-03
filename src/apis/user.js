const URL_API = "/api/user";

export async function createUser(values) {
    const response = await fetch(`${URL_API}/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const responseFromBack = await response.json();
    console.log(responseFromBack);
    if (response.ok) {
      if (responseFromBack === "Pseudo déjà utilisé") {
        throw new Error("Le pseudo est déjà utilisé");
      } else {
        return responseFromBack;
      }
    }
}
