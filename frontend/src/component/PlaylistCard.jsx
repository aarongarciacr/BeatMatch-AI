import { useNavigate } from "react-router-dom";
import SpotifyGreenLogo from "../assets/Spotify_Primary_Logo_RGB_Green.png";

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const handlePlaylistClick = () => {
    navigate(`/playlists/${playlist.id}`);
  };

  const handleSpotifyClick = (e) => {
    e.stopPropagation();
    window.open(playlist.external_urls.spotify, "_blank");
  };

  const handlePlaylistNameLength = (playlistName) => {
    if (playlistName.length > 50) {
      return playlistName.slice(0, 50) + "...";
    }
    return playlistName;
  };
  return (
    <div
      onClick={handlePlaylistClick}
      className="text-white font-bold 
       flex flex-col rounded-lg bg-[#18212f] cursor-pointer w-[18em] hover:bg-[#222e41] hover:-translate-y-1 transition-transform items-center gap-2"
    >
      {playlist.images?.[0]?.url ? (
        <img
          src={playlist?.images[0]?.url}
          alt={playlist.name}
          className="max-h-[16em] max-w-[16em] min-h-[16em] mt-4 object-cover rounded-lg"
        />
      ) : (
        <img
          src={playlist.image}
          alt={playlist.name}
          className="max-h-[16em] max-w-[16em] min-h-[16em] mt-4 object-cover rounded-lg"
        />
      )}
      <div className="flex flex-col w-full justify-evenly px-5 flex-1">
        <h3 className="text-[1.15rem] font-light">
          {handlePlaylistNameLength(playlist.name)}
        </h3>
        <p className=" text-slate-400 text-[0.9rem]">
          {playlist?.tracks?.total || playlist?.tracks?.length} tracks
        </p>
      </div>
      <div className="pt-1 pb-5 w-full flex justify-evenly">
        <button
          className="bg-[#103630] px-5 py-2 rounded-lg w-[70%] hover:bg-green-900 flex flex-row items-center justify-center gap-2"
          onClick={handleSpotifyClick}
        >
          <img className="w-5" src={SpotifyGreenLogo} alt="Spotify Logo" />
          <p className="text-[#1ED760] font-bold">View</p>
        </button>
        <button className="bg-[#3D1F24] rounded-lg w-[15%] hover:bg-red-900 flex flex-row items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash-2 text-red-500"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
