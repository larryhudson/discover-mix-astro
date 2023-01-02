import { v4 as uuidv4 } from "uuid";

export async function get({ redirect, cookies }) {
  // set a state cookie with a random string

  var randomVal = uuidv4();

  cookies.set("spotify-auth-state", randomVal);

  return redirect(
    `/auth/redirect-to-spotify?${new URLSearchParams({
      state: randomVal,
    }).toString()}`
  );
}
