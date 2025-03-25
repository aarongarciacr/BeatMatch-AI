import {
  fetchGetGeneratedPlaylist,
  fetchGetTracks,
} from "../redux/playlistSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlaylistCard2 from "../component/PlaylistCard2";
import TrackCard from "../component/TrackCard";
import PlaylistCard3 from "../component/PlaylistCard3";
import Footer2 from "../component/Footer/Footer2";

const GeneratedPlaylistDetails = () => {
  const dispatch = useDispatch();
  const playlistId = useParams().id;
  const [isLoading, setIsLoading] = useState(true);

  const playlist = useSelector((state) => state.playlists?.singlePlaylist);
  const tracks = useSelector(
    (state) => state.playlists?.singlePlaylist?.tracks || []
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchGetGeneratedPlaylist(playlistId));
        await dispatch(fetchGetTracks(playlistId));
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, playlistId]);

  if (isLoading) {
    return <div className="text-white text-center pt-[200px]">Loading...</div>;
  }

  return (
    <div className="flex h-full min-h-screen flex-col gap-5 backContainer">
      <div className="pt-[100px] w-full flex flex-col  gap-5">
        <div className="container mx-auto flex flex-col py-5 gap-5">
          {playlist && (
            <>
              <PlaylistCard3 playlist={playlist} />
              <div className=" p-5 rounded-3xl">
                <div className="grid grid-cols-[6fr_3fr_3fr_1fr] py-2 pl-2 text-white font-bold border-b-2 border-slate-500 mb-4">
                  <p>TITLE</p>
                  <p>ARTIST</p>
                  <p>ALBUM</p>
                  <p>TIME</p>
                </div>
                {tracks?.map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
            </>
          )}
        </div>
        <Footer2 />
      </div>
    </div>
  );
};

export default GeneratedPlaylistDetails;
