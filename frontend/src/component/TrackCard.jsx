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
      className="grid grid-cols-[6fr_3fr_3fr_1fr] p-1 text-white font-bold rounded-xl justify-center items-center hover:bg-slate-800 hover:translate-x-1 transform transition-all cursor-pointer "
      onClick={() => window.open(spotifyUrl, "_blank")}
    >
      <div className="flex flex-row justify-center gap-5 items-center">
        {albumImage && (
          <img
            src={albumImage}
            alt={trackName}
            className="h-[70px] object-cover rounded-md"
          />
        )}
        <div className="flex flex-col justify-between flex-1">
          <h3 className="text-[1.5rem]">{trackName}</h3>
          <p className="text-slate-400 text-[1.1rem]">{artistsString}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-slate-400 text-[1.1rem]">{artistName}</p>
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-slate-400 text-[1.1rem]">{albumName}</p>
      </div>

      <div className="flex flex-col justify-between">
        <p className="text-slate-400 text-[1.1rem] pr-5">
          {handleDuration(track.duration_ms || 0)}
        </p>
      </div>
    </div>
  );
};

export default TrackCard;
