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

  // const playlistDuration = playlist?.tracks?.items?.reduce(
  //   (acc, item) => acc + item.track.duration_ms,
  //   0
  // );

  return (
    <div
      onClick={handlePlaylistClick}
      className="text-white font-bold flex flex-col gap-5 rounded-lg bg-[#18212f] cursor-pointer w-[18em] hover:bg-[#222e41] hover:-translate-y-1 transition-transform"
    >
      {playlist.images?.[0]?.url && (
        <img
          src={playlist.images[0].url}
          alt={playlist.name}
          className="max-h-[18em] max-w-[18em] object-cover rounded-t-lg"
        />
      )}
      <div className="flex flex-col  justify-evenly px-5 pb-5 flex-1">
        <h3 className="text-[1.15rem] pb-1">{playlist.name}</h3>
        <p className=" text-slate-400 pb-2 text-[0.9rem]">
          {playlist?.tracks?.total || playlist?.tracks?.length} tracks
        </p>
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
