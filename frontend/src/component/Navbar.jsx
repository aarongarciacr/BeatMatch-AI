import { useSelector, useDispatch } from "react-redux";
import WhiteLogo from "../assets/Primary_Logo_White_CMYK.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "./OpenModalButton/OpenModalButton";
import LoginModal from "../component/LoginModal/LoginModal";
import { logoutUser } from "../redux/authSlice";
import beatMatchLogo from "../assets/beatmatch_logo.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const profileDropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogo = () => navigate("/");

  const handleDiscover = () => navigate("/discover");

  const handleMyPlaylists = () => navigate("/playlists");

  const handleGenerate = () => navigate("/dashboard");

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar h-[80px] w-dvw bg-black text-slate-200 fixed top-0 z-50 border-b-2 border-neutral-800">
      <div className="container px-4 flex h-full flex-row justify-between items-center m-auto">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={handleLogo}
        >
          <img
            src={beatMatchLogo}
            alt="BeatMatch AI Logo"
            className="h-[2.5em] cursor-pointer"
            onClick={handleLogo}
          />
          <h1 className="text-2xl cursor-pointer" onClick={handleLogo}>
            BeatMatch AI
          </h1>
        </div>
        {user ? (
          <>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex flex-row gap-5 items-center">
              <div className="flex font-bold gap-5">
                <p
                  className={`cursor-pointer transition-all ${
                    isActive("/discover")
                      ? "text-[#7C3AED]"
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
                      ? "text-[#7C3AED]"
                      : "hover:text-[#9e73e9] hover:text-[1.05rem]"
                  }`}
                  onClick={handleGenerate}
                >
                  Generate
                </p>
              </div>
              <div
                className="flex items-center relative"
                ref={profileDropdownRef}
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleProfileDropdown}
                >
                  <img
                    className="avatar h-[2.5em] rounded-full mr-2"
                    src={user?.images[0]?.url}
                    alt={user?.display_name}
                  />
                  <p className="font-bold">{user?.display_name}</p>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 top-full w-48 bg-neutral-800 rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
              className={`md:hidden fixed inset-0 bg-black bg-opacity-95 z-40 transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ top: "80px" }}
            >
              <div className="flex flex-col items-center pt-8 gap-6">
                <p
                  className={`cursor-pointer text-xl ${
                    isActive("/discover") ? "text-[#7C3AED]" : ""
                  }`}
                  onClick={() => {
                    handleDiscover();
                    setIsMenuOpen(false);
                  }}
                >
                  Discover
                </p>
                <p
                  className={`cursor-pointer text-xl ${
                    isActive("/playlists") ? "text-[#7C3AED]" : ""
                  }`}
                  onClick={() => {
                    handleMyPlaylists();
                    setIsMenuOpen(false);
                  }}
                >
                  My Playlists
                </p>
                <p
                  className={`cursor-pointer text-xl ${
                    isActive("/dashboard") ? "text-[#7C3AED]" : ""
                  }`}
                  onClick={() => {
                    handleGenerate();
                    setIsMenuOpen(false);
                  }}
                >
                  Generate
                </p>
                <div className="flex flex-col items-center mt-4">
                  <img
                    className="avatar h-[3em] rounded-full mb-2"
                    src={user?.images[0]?.url}
                    alt={user?.display_name}
                  />
                  <p className="font-bold">{user?.display_name}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-neutral-800 rounded-md hover:bg-neutral-700 text-white"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // <button
          //   className="bg-[#1ED760] text-white px-6 py-2 rounded-full font-bold"
          //   onClick={handleLogin}
          // >
          //   <img
          //     src={WhiteLogo}
          //     alt="Spotify Logo"
          //     className="w-6 h-6 inline-block mr-2"
          //   />
          //   Login
          // </button>
          <OpenModalButton
            modalComponent={<LoginModal navigate={navigate} />}
            buttonText={
              <>
                <img
                  src={WhiteLogo}
                  alt="Spotify Logo"
                  className="w-6 h-6 inline-block mr-2"
                />
                Login
              </>
            }
            // onButtonClick={handleLogin}
            onModalClose={() => setIsMenuOpen(false)}
            classname="bg-[#1ED760] text-white px-6 py-2 rounded-full font-bold"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
