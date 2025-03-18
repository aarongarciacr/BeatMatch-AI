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
    <div className="flex h-full min-h-screen flex-col gap-5 p-5 bg-[#111827]">
      <div className="pt-[100px] w-full flex flex-col  gap-5">
        <div className="container mx-auto flex flex-col gap-5">
          <h1 className="text-4xl text-white">Playlist Details</h1>
          {playlist && (
            <>
              <PlaylistCard3 playlist={playlist} />
              <div className="p-5 rounded-3xl">
                {tracks && tracks.length > 0 ? (
                  tracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                  ))
                ) : (
                  <p className="text-white">No tracks available</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratedPlaylistDetails;
