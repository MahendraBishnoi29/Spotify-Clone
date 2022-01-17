import Search from "./Search";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Poster from "./Poster";

function Body({ spotifyApi, chooseTrack }) {
  const { data: session } = useSession();

  const { accessToken } = session;

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  useEffect(() => {
    if (!search) return setSearchResult([]);
    if (!accessToken) return;

    //Search Track
    spotifyApi.searchTracks(search).then((res) => {
      setSearchResult(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [accessToken, search, spotifyApi]);

  //New Releases
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases(search).then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken, search, spotifyApi]);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResult.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResult
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
      </div>
    </section>
  );
}

export default Body;
