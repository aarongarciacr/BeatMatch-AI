const TrackCard = ({ track }) => {
  return (
    <div className="flex flex-row gap-5 p-5 mb-3 text-white font-bold bg-[#1f2a3b] rounded-3xl">
      {track.album.images?.[0]?.url && (
        <img
          src={track.album.images[0].url}
          alt={track.name}
          className="max-h-[100px] object-cover"
        />
      )}
      <div className="flex flex-col justify-between flex-1">
        <h3 className="italic text-[1.5rem]">{track.name}</h3>
        <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
        <p className="font-normal">{track.album.name}</p>
      </div>
      <button
        onClick={() => window.open(track.external_urls.spotify, "_blank")}
        className="bg-green-500 px-5 py-2 rounded-lg w-fit h-fit"
      >
        Play on Spotify
      </button>
    </div>
  );
};

export default TrackCard;
