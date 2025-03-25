import { useDispatch, useSelector } from "react-redux";
import { fetchGetPlaylistByActivity } from "../redux/playlistSlice";
import PlaylistCard from "../component/PlaylistCard";
import Footer from "../component/Footer/Footer1";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ActivityDiscover = () => {
  const dispatch = useDispatch();
  const activity = useParams().activity;
  const playlists = useSelector((state) => state.playlists?.activityPlaylists);
  useEffect(() => {
    dispatch(fetchGetPlaylistByActivity(activity));
  }, [dispatch, activity]);

  return (
    <div className="h-full min-h-screen pt-[100px] w-full flex flex-col backContainer gap-3 sm:gap-5">
      <div className="flex flex-col gap-3 sm:gap-5 container mx-auto px-4 sm:p-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
          Activity Discover: {activity}
        </h1>
        <div className="gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid grid-cols-1 m-auto sm:-m-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {playlists?.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDiscover;
