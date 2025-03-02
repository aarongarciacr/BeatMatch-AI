import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlists/${playlist.id}`}>
      <h3>{playlist.name}</h3>
      <p>{playlist.description}</p>
      {playlist.images?.[0]?.url && (
        <img src={playlist.images[0].url} alt={playlist.name} />
      )}
      <button
        onClick={() => window.open(playlist.external_urls.spotify, "_blank")}
      >
        Open on Spotify
      </button>
    </Link>
  );
};

export default PlaylistCard;
