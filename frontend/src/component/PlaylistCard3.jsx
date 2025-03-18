import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddTracks, fetchCreatePlaylist } from "../redux/playlistSlice";

const PlaylistCard3 = ({ playlist }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSpotifyClick = async (e) => {
    e.stopPropagation();
    try {
      const trackUris = playlist.tracks.map((track) => track.uri);

      const newPlaylist = await dispatch(fetchCreatePlaylist(playlist));
      const playlistId = newPlaylist.playlist.id;
      if (playlistId) {
        await dispatch(fetchAddTracks(playlistId, trackUris));
      }
      navigate(`/playlists/${playlistId}`);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const playlistDuration = playlist?.tracks?.reduce(
    (acc, track) => acc + track.duration_ms,
    0
  );

  const durationHandle = (playlistDuration) => {
    if (playlistDuration < 60000) {
      return `${(playlistDuration / 1000).toFixed(0)}s`;
    } else if (playlistDuration < 3600000) {
      return `${(playlistDuration / 60000).toFixed(0)} minutes ${(
        (playlistDuration % 60000) /
        1000
      ).toFixed(0)}s`;
    } else {
      return `${(playlistDuration / 3600000).toFixed(0)}h ${(
        (playlistDuration % 3600000) /
        60000
      ).toFixed(0)} minutes`;
    }
  };
  const playlistImage = playlist.tracks[0]?.album?.images[0]?.url;

  return (
    <div className="text-white font-bold flex gap-5 rounded-lg  w-full h-[20em] justify-center items-center ">
      {playlistImage && (
        <img
          src={playlistImage}
          alt={playlist.name}
          className="h-[18em] w-[18em] object-cover rounded-lg ml-5 min-h-[18em]"
        />
      )}
      <div className="flex flex-col  justify-evenly px-5 pb-5 flex-1">
        <h3 className="text-5xl pb-1">{playlist.name}</h3>
        <p className=" text-slate-400 py-2 text-[1.5rem]">
          {playlist.description}
        </p>
        <p className=" text-slate-400 py-2 pb-4 text-[1.2rem]">
          {playlist.tracks.length} tracks • {durationHandle(playlistDuration)}
        </p>
        <button
          className="bg-green-500 px-4 h-[4em] text-[1.2rem] rounded-full w-fit flex items-center gap-2"
          onClick={handleSpotifyClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
          </svg>
          Save on Spotify
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard3;
