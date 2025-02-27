import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/authSlice";
import { loadUserPlaylists } from "../redux/playlistSlice";
import PlaylistCard from "../components/PlaylistCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { items: playlists } = useSelector((state) => state.playlists);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(loadUserPlaylists());
  }, [dispatch]);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <h2 className="text-2xl font-bold">Welcome, {user.display_name}!</h2>
          <h3 className="mt-4 text-lg">Your Spotify Playlists:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))
            ) : (
              <p>No playlists found.</p>
            )}
          </div>
        </>
      ) : (
        <a
          href="http://localhost:5000/api/auth/login"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Login with Spotify
        </a>
      )}
    </div>
  );
};

export default Dashboard;
