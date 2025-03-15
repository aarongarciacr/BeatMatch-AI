import { fetchPlaylistDetails } from "../redux/playlistSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PlaylistCard2 from "../component/PlaylistCard2";
import TrackCard from "../component/TrackCard";

const PlaylistDetails = () => {
  const dispatch = useDispatch();
  const playlistId = useParams().id;
  const playlist = useSelector((state) => state.playlists?.singlePlaylist);
  console.log("playlistId", playlistId);
  console.log("playlist", playlist);

  useEffect(() => {
    dispatch(fetchPlaylistDetails(playlistId));
  }, [dispatch, playlistId]);

  return (
    <div className="flex h-full min-h-screen flex-col gap-5 p-5 bg-[#111827]">
      <div className="pt-[100px] w-full flex flex-col  gap-5">
        <div className="container mx-auto flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-white">Playlist Details</h1>
          {playlist && (
            <>
              <PlaylistCard2 playlist={playlist} />
              <div className=" p-5 rounded-3xl">
                {playlist?.tracks?.items?.map((track) => (
                  <TrackCard key={track.track.id} track={track.track} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetails;
