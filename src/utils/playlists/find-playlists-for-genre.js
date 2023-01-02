import genresJson from "../genres/genres.json" assert { type: "json" };
import cheerio from "cheerio";
import { lookupPlaylist } from "./lookup-playlist-data.js";

export async function findPlaylistsForGenre({ genreName, spotifyAccessToken }) {
  const genreInList = genresJson.find((g) => g.name === genreName);

  if (!genreInList)
    throw new Error(`Could not find ${genreName} in list of ENAO genres.`);

  const soundPlaylistId = genreInList.soundPlaylistId;

  const soundPlaylistData = await lookupPlaylist({
    playlistId: soundPlaylistId,
    spotifyAccessToken,
  });

  // find linked playlists from the description
  const $ = cheerio.load(`<p>${soundPlaylistData.description}</p>`);

  const playlists = [
    {
      type: "Sound",
      id: soundPlaylistId,
    },
  ];

  const types = ["Edge", "Intro", "Pulse", "♀Filter", "2022"];

  $("a").each((_i, aTag) => {
    if (types.includes($(aTag).text())) {
      playlists.push({
        type: $(aTag).text(),
        id: $(aTag).attr("href").split(":").at(-1),
      });
    }
  });

  return playlists;
}
