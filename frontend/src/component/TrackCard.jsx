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

  return (
    <div
      className="flex flex-row gap-5 p-5 mb-3 text-white font-bold rounded-xl justify-center items-center hover:bg-slate-800 hover:-translate-y-1 transform transition-all cursor-pointer"
      onClick={() => window.open(track.external_urls.spotify, "_blank")}
    >
      {track.album.images?.[0]?.url && (
        <img
          src={track.album.images[0].url}
          alt={track.name}
          className="h-[70px] object-cover rounded-md"
        />
      )}
      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-[1.5rem]">{track.name}</h3>
        <p className="text-slate-400 py-1 text-[1.1rem]">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-slate-400 py-1 text-[1.1rem]">
          {handleDuration(track.duration_ms)}
        </p>
      </div>
    </div>
  );
};

export default TrackCard;
