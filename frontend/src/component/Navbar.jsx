import { useSelector } from "react-redux";
import WhiteLogo from "../assets/Primary_Logo_White_CMYK.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleLogin = () => {
    window.location.href = "/api/auth/login"; // Redirects the user to Spotify login
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <nav className="navbar h-[80px] w-dvw bg-neutral-900 text-slate-200 fixed top-0 z-50">
      <div className="container flex h-full flex-row justify-between items-center m-auto  ">
        <h1
          className="font-extrabold text-2xl cursor-pointer"
          onClick={handleNavigate}
        >
          BeatMatch AI
        </h1>
        {user ? (
          <div className="flex items-center">
            <img
              className="avatar h-[2.5em] rounded-full mr-2"
              src={user.images[0].url}
              alt={user.display_name}
            />
            <p className="font-bold">{user.display_name}</p>
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
