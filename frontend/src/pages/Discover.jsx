import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetDiscoverPlaylists } from "../redux/playlistSlice";
import PlaylistCard from "../component/PlaylistCard";

const Discover = () => {
  const dispatch = useDispatch();
  const discoverPlaylists = useSelector((state) => state.playlists?.discover);
  console.log("discoverPlaylists", discoverPlaylists);
  useEffect(() => {
    document.title = "Discover - Spotify";

    try {
      dispatch(fetchGetDiscoverPlaylists());
    } catch (error) {
      console.error("Error fetching discover playlists:", error);
    }
  }, [dispatch]);

  return (
    <div className="h-full min-h-screen pt-[100px] w-full flex flex-col bg-[#111827] gap-5">
      <div className="flex flex-col gap-5 items-center">
        <h1>Discover</h1>
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {discoverPlaylists?.map((playlist) => (
            // <div key={playlist._id}>
            //   <h2>
            //     {idx + 1} {playlist.name}
            //   </h2>
            //   <p>{playlist.description}</p>
            // </div>
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
