import SpotifyWhiteLogo from "../assets/Spotify_Primary_Logo_RGB_White.png";

const PlaylistCard2 = ({ playlist }) => {
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
    <div className="text-white font-bold flex gap-5 rounded-lg  w-full h-[20em] justify-center items-center ">
      {playlist.images?.[0]?.url && (
        <img
          src={playlist.images[0].url}
          alt={playlist.name}
          className="h-[18em] w-[18em] object-cover rounded-lg ml-5 min-h-[18em]"
        />
      )}
      <div className="flex flex-col  justify-evenly px-5 pb-5 flex-1">
        <h3 className="text-5xl pb-1 ">{playlist.name}</h3>
        <p className=" text-slate-400 py-2 text-[1.5rem]">
          {playlist.description}
        </p>
        <p className=" text-slate-400 py-2 pb-4 text-[1.2rem]">
          Created by {playlist?.owner?.display_name} • {playlist?.tracks?.total}{" "}
          tracks • {durationHandle(playlistDuration)}
        </p>
        <button
          className="bg-green-500 px-4 h-[3em] text-[1.2rem] rounded-full w-fit flex items-center gap-2"
          onClick={handleSpotifyClick}
        >
          <img src={SpotifyWhiteLogo} alt="Spotify Logo" className="w-5" />
          Play on Spotify
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard2;
