export async function get({ request, cookies, redirect }) {
  const requestUrl = new URL(request.url);
  const spotifyCode = requestUrl.searchParams.get("code");

  const SPOTIFY_CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;

  const authString = `Basic ${btoa(
    SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
  )}`;

  const SPOTIFY_REDIRECT_URI = requestUrl.origin + "/auth/callback";

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: spotifyCode,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
    method: "POST",
    headers: {
      Authorization: authString,
    },
  });

  if (tokenResponse.ok) {
    const tokenResponseJson = await tokenResponse.json();
    const accessToken = tokenResponseJson.access_token;

    cookies.set("spotify-access-token", accessToken, { path: "/" });

    return redirect("/app/");
  } else {
    const responseText = await tokenResponse.text();
    console.log(responseText);
    // handle this later
  }
}
