import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/authSlice";
import MoodCard from "../component/MoodCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "../component/SearchBar";
import Footer2 from "../component/Footer/Footer2";
import { moods, activities } from "../constants/moodAndActivities.jsx";

const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
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

    console.log("Sending to backend:", requestBody);

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

  // Helper function to render MoodCards or ActivityCards with selection handling
  const renderCards = (items, selectedItem, setSelectedItem) => (
    <div className="flex flex-wrap gap-5 items-center justify-center">
      {items.map((item) => (
        <MoodCard
          key={item.name}
          mood={item}
          onClick={() => setSelectedItem(item.name)}
          isSelected={selectedItem === item.name}
        />
      ))}
    </div>
  );

  return (
    <div className="h-full min-h-screen pt-[100px] w-full flex flex-col bg-[#111827] gap-5">
      {/* User Profile Section */}
      <div className="h-[15em] p-5 rounded-3xl bg-[#1F2937] w-[70%] m-auto flex flex-col gap-3">
        <h1 className="text-3xl text-slate-200">
          Welcome back, {user?.display_name?.split(" ")[0]}!
        </h1>
        {user && (
          <div className="text-slate-300 font-bold">
            <h2 className="text-[1.2rem]">Your Spotify Profile</h2>
            <div className="text-slate-400">
              <p>{user.email}</p>
              <p>{user.followers.total} followers</p>
              <a
                className="underline"
                href={user.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                Open Spotify Profile
              </a>
            </div>
          </div>
        )}
        <a href="/playlists">View Playlists</a>
      </div>

      {/* Playlist Creation Section */}
      <div className="h-full w-[70%] m-auto p-5 flex flex-col gap-5 bg-[#1f2937] rounded-3xl mb-10">
        <p className="text-slate-300 font-bold text-2xl">
          Let's create your perfect playlist for today.
        </p>

        {/* Mood Selection */}
        <div className="flex flex-col gap-5">
          <p className="text-slate-300 font-bold">Mood</p>
          {renderCards(moods, selectedMood, setSelectedMood)}
        </div>

        {/* Activity Selection */}
        <div className="flex flex-col gap-5">
          <p className="text-slate-300 font-bold">Activity</p>
          {renderCards(activities, selectedActivity, setSelectedActivity)}
        </div>

        {/* Favorite Artists & Genres (SearchBar) */}
        <div className="flex flex-col gap-5">
          <p className="text-slate-300 font-bold">Favorite Artists & Genres</p>
          <SearchBar onSelectedItemsChange={setSelectedItems} />
        </div>

        {/* Playlist Length Selection */}
        <div className="flex flex-col gap-5">
          <p className="text-slate-300 font-bold">Playlist Length</p>
          <div className="flex flex-row gap-5 items-center justify-center">
            {["10", "15", "20"].map((length) => (
              <button
                key={length}
                onClick={() => setSelectedLength(length)}
                className={`${
                  selectedLength === length
                    ? "bg-green-500"
                    : "bg-[#374151] transition-colors hover:bg-[#353f4e]"
                } text-white px-5 py-2 rounded-lg `}
              >
                {length} Songs
              </button>
            ))}
          </div>
        </div>

        {/* Generate Playlist Button */}
        <button
          className={`px-5 py-2 rounded-lg mt-5 ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 cursor-pointer hover:bg-green-600"
          } text-white`}
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
