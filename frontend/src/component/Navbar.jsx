import { useSelector } from "react-redux";
import WhiteLogo from "../assets/Primary_Logo_White_CMYK.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    window.location.href = "/api/auth/login"; // Redirects the user to Spotify login
  };

  const handleLogo = () => navigate("/");

  const handleDiscover = () => navigate("/discover");

  const handleMyPlaylists = () => navigate("/playlists");

  const handleGenerate = () => navigate("/dashboard");

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar h-[80px] w-dvw bg-neutral-900 text-slate-200 fixed top-0 z-50">
      <div className="container flex h-full flex-row justify-between items-center m-auto  ">
        <h1
          className="font-extrabold text-2xl cursor-pointer"
          onClick={handleLogo}
        >
          BeatMatch AI
        </h1>
        {user ? (
          <div className="flex flex-row gap-5 items-center">
            <div className="flex font-bold gap-5">
              <p
                className={`cursor-pointer transition-all ${
                  isActive("/discover")
                    ? "text-[#7C3AED] "
                    : "hover:text-[#9e73e9] hover:text-[1.05rem]"
                }`}
                onClick={handleDiscover}
              >
                Discover
              </p>
              <p
                className={`cursor-pointer transition-all ${
                  isActive("/playlists")
                    ? "text-[#7C3AED]"
                    : "hover:text-[#9e73e9] hover:text-[1.05rem]"
                }`}
                onClick={handleMyPlaylists}
              >
                My Playlists
              </p>
              <p
                className={`cursor-pointer transition-all ${
                  isActive("/dashboard")
                    ? "text-[#7C3AED] "
                    : "hover:text-[#9e73e9] hover:text-[1.05rem]"
                }`}
                onClick={handleGenerate}
              >
                Generate
              </p>
            </div>
            <div className="flex items-center">
              <img
                className="avatar h-[2.5em] rounded-full mr-2"
                src={user.images[0].url}
                alt={user.display_name}
              />
              <p className="font-bold">{user.display_name}</p>
            </div>
          </div>
        ) : (
          <button
            className=" bg-[#1ED760] text-white px-6 py-2 rounded-full font-bold"
            onClick={handleLogin}
          >
            <img
              src={WhiteLogo}
              alt="Spotify Logo"
              className="w-6 h-6 inline-block mr-2"
            />
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
