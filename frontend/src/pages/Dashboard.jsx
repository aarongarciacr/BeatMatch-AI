import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/authSlice";
import MoodCard from "../component/MoodCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "../component/SearchBar";
import Footer2 from "../component/Footer/Footer2";
import { moods, activities } from "../constants/moodAndActivities.jsx";
import moodIcon from "../assets/Mood.svg";
import activityIcon from "../assets/Sprint.svg";

const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedLength, setSelectedLength] = useState("10"); // default to 10
  const [selectedItems, setSelectedItems] = useState([]); // Artists & Genres
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  // Function to handle playlist generation request
  const handleGeneratePlaylist = async () => {
    setIsLoading(true);

    const favoriteGenresAndArtists = selectedItems.map((item) => item.name);

    const requestBody = {
      mood: selectedMood,
      activity: selectedActivity,
      favoriteGenresAndArtists,
      length: parseInt(selectedLength) || 10,
    };

    try {
      const response = await fetch("/api/playlists/generate", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to generate playlist");
      }

      const data = await response.json();
      alert(`Playlist created: ${data.playlist.name}`);
      navigate(`/playlists/BM/${data.playlist.id}`);
    } catch (error) {
      console.error("Error generating playlist:", error);
      alert("Failed to generate playlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full min-h-screen pt-[100px] w-full flex flex-col backContainer gap-3 md:gap-5">
      <div className="flex flex-col pb-3 md:pb-5 items-center justify-center gap-3 md:gap-5 px-4 md:px-0">
        <h1 className="text-2xl md:text-4xl text-center">
          Create Your Perfect Playlist
        </h1>
        <p className="font-bold text-sm md:text-base text-center">
          Customized your playlist parameters and let AI do the magic
        </p>
      </div>

      {/* Playlist Creation Section */}
      <div className="h-full w-[95%] md:w-[85%] lg:w-[70%] m-auto p-3 md:p-5 flex flex-col gap-4 md:gap-5 bg-[#090C14] rounded-xl md:rounded-3xl mb-10">
        {/* Mood Selection */}
        <div className="flex flex-col gap-3 md:gap-5">
          <div className="flex flex-row gap-2 justify-start items-center">
            <img
              src={moodIcon}
              alt="mood"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <p className="text-slate-300 font-bold text-lg md:text-xl">
              Select Mood
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-5 items-center justify-center">
            {moods.map((item) => (
              <MoodCard
                key={item.name}
                mood={item}
                onClick={() => setSelectedMood(item.name)}
                isSelected={selectedMood === item.name}
              />
            ))}
          </div>
        </div>

        {/* Activity Selection */}
        <div className="flex flex-col gap-3 md:gap-5">
          <div className="flex flex-row gap-2 justify-start items-center">
            <img
              src={activityIcon}
              alt="activity"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <p className="text-slate-300 font-bold text-lg md:text-xl">
              Choose Activity
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:gap-5 items-center justify-center">
            {activities.map((item) => (
              <MoodCard
                key={item.name}
                mood={item}
                onClick={() => setSelectedActivity(item.name)}
                isSelected={selectedActivity === item.name}
              />
            ))}
          </div>
        </div>

        {/* Favorite Artists & Genres (SearchBar) */}
        <div className="flex flex-col gap-3 md:gap-5">
          <p className="text-slate-300 font-bold text-lg md:text-xl">
            Favorite Artists & Genres
          </p>
          <SearchBar onSelectedItemsChange={setSelectedItems} />
        </div>

        {/* Playlist Length Selection */}
        <div className="flex flex-col gap-3 md:gap-5">
          <div className="flex justify-between items-center">
            <p className="text-slate-300 font-bold text-sm md:text-base">
              Playlist Length
            </p>
            <span className="text-purple-500/80 font-bold text-sm md:text-base">
              {selectedLength} Songs
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            step="5"
            value={selectedLength}
            onChange={(e) => setSelectedLength(e.target.value)}
            className="w-full h-2 bg-[#374151] rounded-lg appearance-none cursor-pointer 
              accent-purple-500 
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:bg-purple-500 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:hover:scale-150
              [&::-moz-range-thumb]:appearance-none 
              [&::-moz-range-thumb]:w-4 
              [&::-moz-range-thumb]:h-4 
              [&::-moz-range-thumb]:bg-purple-500 
              [&::-moz-range-thumb]:border-none
              [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:transition-all
              [&::-moz-range-thumb]:hover:scale-150"
          />
          <div className="flex justify-between text-[10px] md:text-xs text-slate-400">
            <span>10 songs</span>
            <span>30 songs</span>
          </div>
        </div>

        {/* Generate Playlist Button */}
        <button
          className={`px-4 md:px-5 py-2 rounded-lg mt-3 md:mt-5 ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#7C3AED] cursor-pointer hover:bg-[#8a51ee] transition-colors"
          } text-white text-sm md:text-base`}
          onClick={handleGeneratePlaylist}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Generating...
            </span>
          ) : (
            <div className="flex items-center justify-center gap-2 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3333333333333333"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-wand-sparkles"
              >
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
                <path d="m14 7 3 3" />
                <path d="M5 6v4" />
                <path d="M19 14v4" />
                <path d="M10 2v2" />
                <path d="M7 8H3" />
                <path d="M21 16h-4" />
                <path d="M11 3H9" />
              </svg>
              Generate Playlist
            </div>
          )}
        </button>
      </div>
      <Footer2 />
    </div>
  );
};

export default Dashboard;
