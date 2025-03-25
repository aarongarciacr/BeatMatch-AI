import SpotifyWhiteLogo from "../assets/Spotify_Primary_Logo_RGB_White.png";

const PlaylistCard2 = ({ playlist }) => {
  console.log("playlist", playlist);

  const handleSpotifyClick = (e) => {
    e.stopPropagation();
    window.open(playlist.external_urls.spotify, "_blank");
  };

  console.log("name", playlist.name);

  const playlistDuration = playlist?.tracks?.items?.reduce(
    (acc, item) => acc + item.track.duration_ms,
    0
  );

  const durationHandle = (playlistDuration) => {
    if (playlistDuration < 60000) {
      return `${(playlistDuration / 1000).toFixed(0)}s`;
    } else if (playlistDuration < 3600000) {
      return `${(playlistDuration / 60000).toFixed(0)} min `;
    } else {
      return `${(playlistDuration / 3600000).toFixed(0)}h ${(
        (playlistDuration % 3600000) /
        60000
      ).toFixed(0)} minutes`;
    }
  };

  return (
    <div className="text-white font-bold flex flex-col lg:flex-row gap-5 rounded-lg w-full min-h-[20em] justify-center items-center p-4">
      {playlist.images?.[0]?.url && (
        <img
          src={playlist.images[0].url}
          alt={playlist.name}
          className="h-[15em] w-[15em] md:h-[18em] md:w-[18em] object-cover rounded-lg md:ml-5 min-h-[15em] md:min-h-[18em]"
        />
      )}
      <div className="flex flex-col justify-evenly px-2 md:px-5 pb-5 flex-1 text-center lg:text-left">
        <h3 className="text-3xl md:text-5xl pb-1 break-words">
          {playlist.name}
        </h3>
        <p className="text-slate-400 py-2 text-base md:text-[1.5rem] break-words">
          {playlist.description}
        </p>
        <p className="text-slate-400 py-2 pb-4 text-sm md:text-[1.2rem]">
          Created by {playlist?.owner?.display_name} • {playlist?.tracks?.total}{" "}
          tracks • {durationHandle(playlistDuration)}
        </p>
        <div className="flex justify-center lg:justify-start">
          <button
            className="bg-green-500 px-4 h-[3em] text-base md:text-[1.2rem] rounded-full w-fit flex items-center gap-2 hover:bg-green-600 transition-colors"
            onClick={handleSpotifyClick}
          >
            <img
              src={SpotifyWhiteLogo}
              alt="Spotify Logo"
              className="w-4 md:w-5"
            />
            Play on Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard2;
