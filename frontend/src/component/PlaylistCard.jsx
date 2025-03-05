import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = () => {
    navigate(`/playlists/${playlist.id}`);
  };

  const handleSpotifyClick = (e) => {
    e.stopPropagation();
    window.open(playlist.external_urls.spotify, "_blank");
  };

  return (
    <div
      onClick={handlePlaylistClick}
      className="text-white font-bold flex flex-row gap-5 p-5 bg-[#18212f] rounded-3xl cursor-pointer"
    >
      {playlist.images?.[0]?.url && (
        <img
          src={playlist.images[0].url}
          alt={playlist.name}
          className="max-h-[250px] object-cover"
        />
      )}
      <div className="flex flex-col  justify-between flex-1">
        <h3 className="text-[1.5rem] py-5">{playlist.name}</h3>
        <p className="pb-5">{playlist.description}</p>
        <button
          className="bg-green-500 px-5 py-2 rounded-lg w-fit"
          onClick={handleSpotifyClick}
        >
          Open on Spotify
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
