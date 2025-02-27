const PlaylistCard = ({ playlist }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <img
        src={playlist.images[0]?.url}
        alt={playlist.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-bold">{playlist.name}</h3>
      <p className="text-sm text-gray-400">{playlist.description}</p>
      <a
        href={playlist.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        Open in Spotify
      </a>
    </div>
  );
};

export default PlaylistCard;
