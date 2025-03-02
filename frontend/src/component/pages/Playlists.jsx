import { useEffect } from "react";
import { fetchUserPlaylists } from "../redux/playlistSlice";
import { useDispatch, useSelector } from "react-redux";

const Playlists = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists?.items);
  const status = useSelector((state) => state.playlists?.status);
  const error = useSelector((state) => state.playlists?.error);
  console.log("playlists", playlists);
  useEffect(() => {
    dispatch(fetchUserPlaylists());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Playlists</h1>
      <p>Here are your playlists!</p>
      {playlists && playlists.length > 0 ? (
        playlists.map((playlist) => (
          <div key={playlist.id}>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            {playlist.images?.[0]?.url && (
              <img src={playlist.images[0].url} alt={playlist.name} />
            )}
          </div>
        ))
      ) : (
        <p>No playlists found</p>
      )}
    </div>
  );
};

export default Playlists;
