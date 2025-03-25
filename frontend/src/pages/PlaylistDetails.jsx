import { fetchPlaylistDetails } from "../redux/playlistSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PlaylistCard2 from "../component/PlaylistCard2";
import TrackCard from "../component/TrackCard";
import Footer2 from "../component/Footer/Footer2";

const PlaylistDetails = () => {
  const dispatch = useDispatch();
  const playlistId = useParams().id;
  const playlist = useSelector((state) => state.playlists?.singlePlaylist);

  useEffect(() => {
    dispatch(fetchPlaylistDetails(playlistId));
  }, [dispatch, playlistId]);

  return (
    <div className="flex h-full min-h-screen flex-col gap-5 backContainer">
      <div className="pt-[100px] w-full flex flex-col  gap-5">
        <div className="container mx-auto flex flex-col py-5 gap-5">
          {playlist && (
            <>
              <PlaylistCard2 playlist={playlist} />
              <div className=" p-5 rounded-3xl">
                <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[6fr_3fr_3fr_1fr] py-2 pl-2 text-white font-bold border-b-2 border-slate-500 mb-4">
                  <p>TITLE</p>
                  <p className="hidden md:block">ARTIST</p>
                  <p className="hidden md:block">ALBUM</p>
                  <p className="text-end">TIME</p>
                </div>
                {playlist?.tracks?.items?.map((track) => (
                  <TrackCard key={track.track.id} track={track.track} />
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

export default PlaylistDetails;
