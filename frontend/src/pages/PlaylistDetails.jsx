import { fetchPlaylistDetails } from "../redux/playlistSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PlaylistCard from "../component/PlaylistCard";
import TrackCard from "../component/TrackCard";

const PlaylistDetails = () => {
  const dispatch = useDispatch();
  const playlistId = useParams().id;
  const playlist = useSelector((state) => state.playlists?.singlePlaylist);
  console.log("playlistId", playlistId);
  console.log("playlist", playlist);

  useEffect(() => {
    dispatch(fetchPlaylistDetails(playlistId));
  }, [dispatch]);

  return (
    <div>
      <h1>Playlist Details</h1>
      {playlist && (
        // <div>
        //   <h2>{playlist.name}</h2>
        //   <p>{playlist.description}</p>
        //   {playlist.images?.[0]?.url && (
        //     <img src={playlist.images[0].url} alt={playlist.name} />
        //   )}
        // </div>
        <>
          <PlaylistCard playlist={playlist} />
          {playlist.tracks.items.map((track) => (
            <TrackCard key={track.track.id} track={track.track} />
          ))}
        </>
      )}
    </div>
  );
};

export default PlaylistDetails;
