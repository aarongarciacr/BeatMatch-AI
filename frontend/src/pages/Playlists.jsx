import { useEffect } from "react";
import { fetchUserPlaylists } from "../redux/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "../component/PlaylistCard";

const Playlists = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists?.items);
  const status = useSelector((state) => state.playlists?.status);
  const error = useSelector((state) => state.playlists?.error);

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
      {playlists &&
        playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
    </div>
  );
};

export default Playlists;
