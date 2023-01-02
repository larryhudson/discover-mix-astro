import { lookupPlaylist } from "../playlists/lookup-playlist-data.js";
import cheerio from "cheerio";
import genresJson from "./genres.json" assert { type: "json" };

export async function getSimilarGenres({ spotifyAccessToken, genreName }) {
  const soundPlaylistId = genresJson.find(
    (g) => g.name === genreName
  ).soundPlaylistId;

  const soundPlaylistData = await lookupPlaylist({
    playlistId: soundPlaylistId,
    spotifyAccessToken,
  });

  const $ = cheerio.load(`<p>${soundPlaylistData.description}</p>`);

  const types = ["Edge", "Intro", "Pulse", "♀Filter", "2022"];

  const similarGenres = [];

  $("a").each((_i, aTag) => {
    const isType = types.includes($(aTag).text());
    const isPointingToEnao =
      $(aTag).attr("href").indexOf("everynoise.com") !== -1;

    const isGenre = !(isType || isPointingToEnao);

    if (isGenre) {
      similarGenres.push({
        name: $(aTag).text().toLowerCase(),
        soundPlaylistId: $(aTag).attr("href").split(":").at(-1),
      });
    }
  });

  return similarGenres;
}
