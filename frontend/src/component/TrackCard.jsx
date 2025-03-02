const TrackCard = ({ track }) => {
  return (
    <div>
      <h3>{track.name}</h3>
      <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
      <p>{track.album.name}</p>
      {track.album.images?.[0]?.url && (
        <img src={track.album.images[0].url} alt={track.name} />
      )}
      <button
        onClick={() => window.open(track.external_urls.spotify, "_blank")}
      >
        Play on Spotify
      </button>
    </div>
  );
};

export default TrackCard;
