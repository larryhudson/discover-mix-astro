export async function get({ request, redirect }) {
  // set a state cookie with a random string

  const requestUrl = new URL(request.url);
  const stateValue = requestUrl.searchParams.get("state");

  const requestOrigin = requestUrl.origin;

  const spotifyUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.SPOTIFY_CLIENT_ID,
      scope: "playlist-modify-private playlist-read-private user-top-read",
      redirect_uri: requestOrigin + "/auth/callback",
      state: stateValue,
    }).toString();

  return redirect(spotifyUrl);
}
