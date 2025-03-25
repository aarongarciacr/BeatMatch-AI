const TrackCard = ({ track }) => {
  const handleDuration = (duration) => {
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };

  // Handle case where track might be in database format
  const artistName =
    track.artist ||
    (track.artists && track.artists[0]?.name) ||
    "Unknown Artist";
  const artistsString =
    track.artists?.map((artist) => artist.name).join(", ") || artistName;
  const albumName = track.album?.name || "Unknown Album";
  const albumImage = track.image || track.album?.images?.[0]?.url;
  const trackName = track.title || track.name || "Unknown Track";
  const spotifyUrl = track.external_urls?.spotify || "#";

  return (
    <div
      className="relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[6fr_3fr_3fr_1fr] p-3 md:p-2 text-white font-bold rounded-xl items-center hover:bg-slate-800 hover:translate-x-1 transform transition-all cursor-pointer gap-3 md:gap-4"
      onClick={() => window.open(spotifyUrl, "_blank")}
    >
      <div className="col-span-2 md:col-span-1 flex items-center gap-3 max-w-full">
        {albumImage && (
          <img
            src={albumImage}
            alt={trackName}
            className="h-[45px] md:h-[60px] w-[45px] md:w-[60px] object-cover rounded-md flex-shrink-0"
          />
        )}
        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="text-sm md:text-lg font-bold line-clamp-1">
            {trackName}
          </h3>
          <p className="text-xs md:text-sm text-slate-400 line-clamp-1">
            {artistsString}
          </p>
        </div>
      </div>

      <div className="hidden md:block overflow-hidden">
        <p className="text-sm text-slate-400 line-clamp-1">{artistName}</p>
      </div>

      <div className="hidden md:block overflow-hidden">
        <p className="text-sm text-slate-400 line-clamp-1">{albumName}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-xs md:text-sm text-slate-400">
          {handleDuration(track.duration_ms || 0)}
        </p>
      </div>
    </div>
  );
};

export default TrackCard;
