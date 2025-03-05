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
    <div className="h-full pt-[100px] w-full flex flex-col bg-[#111827] gap-5">
      <div className="container mx-auto flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-white ">Playlists</h1>
        {playlists &&
          playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
      </div>
    </div>
  );
};

export default Playlists;
