const API = "/api/auth";

export async function signin(credentials) {
  const response = await fetch(`${API}/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const responseFromBack = await response.json();
  if (response.ok) {
    return responseFromBack;
  } else {
    if (responseFromBack) {
      throw responseFromBack;
    } else {
      throw new Error("Erreur de connexion");
    }
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API}/current`, {
    // credentials: "include"
  });
  return await response.json();
}

export async function signout() {
  await fetch(API, {
    method: "DELETE",
  });
}
