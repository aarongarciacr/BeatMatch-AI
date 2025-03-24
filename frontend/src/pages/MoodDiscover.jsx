import { useDispatch, useSelector } from "react-redux";
import { fetchGetPlaylistByMood } from "../redux/playlistSlice";
import PlaylistCard from "../component/PlaylistCard";
import Footer from "../component/Footer/Footer1";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MoodDiscover = () => {
  const dispatch = useDispatch();
  const mood = useParams().mood;
  const playlists = useSelector((state) => state.playlists?.moodPlaylists);
  console.log("mood", mood);
  useEffect(() => {
    dispatch(fetchGetPlaylistByMood(mood));
  }, [dispatch, mood]);

  console.log("playlists", playlists);
  return (
    <div className="h-full min-h-screen pt-[100px] w-full flex flex-col backContainer gap-5">
      <div className="flex flex-col gap-5 container m-auto p-5">
        <h1>Mood Discover</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 container m-auto">
          {playlists?.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoodDiscover;
