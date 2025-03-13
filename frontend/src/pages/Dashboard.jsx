import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/authSlice";
import MoodCard from "../component/MoodCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "../component/SearchBar";

const moods = [
  {
    name: "Happy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-smile"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    ),
  },
  {
    name: "Sad",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-heart-crack"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="m12 13-1-1 2-2-3-3 2-2" />
      </svg>
    ),
  },
  {
    name: "Chill",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-cloud"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    name: "Excited",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-laugh"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    ),
  },
  {
    name: "Romantic",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-heart"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    name: "Energetic",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-zap"
      >
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </svg>
    ),
  },
  {
    name: "Motivated",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-biceps-flexed"
      >
        <path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1" />
        <path d="M15 14a5 5 0 0 0-7.584 2" />
        <path d="M9.964 6.825C8.019 7.977 9.5 13 8 15" />
      </svg>
    ),
  },
  {
    name: "Calm",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-tent-tree"
      >
        <circle cx="4" cy="4" r="2" />
        <path d="m14 5 3-3 3 3" />
        <path d="m14 10 3-3 3 3" />
        <path d="M17 14V2" />
        <path d="M17 14H7l-5 8h20Z" />
        <path d="M8 14v8" />
        <path d="m9 14 5 8" />
      </svg>
    ),
  },
];

const activities = [
  {
    name: "Workout",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-dumbbell"
      >
        <path d="M14.4 14.4 9.6 9.6" />
        <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
        <path d="m21.5 21.5-1.4-1.4" />
        <path d="M3.9 3.9 2.5 2.5" />
        <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
      </svg>
    ),
  },
  {
    name: "Study",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-notebook-pen"
      >
        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
        <path d="M2 6h4" />
        <path d="M2 10h4" />
        <path d="M2 14h4" />
        <path d="M2 18h4" />
        <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
      </svg>
    ),
  },
  {
    name: "Party",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-party-popper"
      >
        <path d="M5.8 11.3 2 22l10.7-3.79" />
        <path d="M4 3h.01" />
        <path d="M22 8h.01" />
        <path d="M15 2h.01" />
        <path d="M22 20h.01" />
        <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
        <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" />
        <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
        <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
      </svg>
    ),
  },
  {
    name: "Focus",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-scan-eye"
      >
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <circle cx="12" cy="12" r="1" />
        <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
      </svg>
    ),
  },
  {
    name: "Sleep",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-bed-double"
      >
        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
        <path d="M12 4v6" />
        <path d="M2 18h20" />
      </svg>
    ),
  },
  {
    name: "Drive",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3333333333333333"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-car"
      >
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
];

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
    <div className="h-full pt-[100px] w-full flex flex-col bg-[#111827] gap-5">
      {/* User Profile Section */}
      <div className="h-[15em] p-5 rounded-3xl bg-[#1F2937] w-[70%] m-auto flex flex-col gap-3">
        <h1 className="text-3xl text-slate-200 font-bold">
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
                stroke-width="1.3333333333333333"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-wand-sparkles"
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
    </div>
  );
};

export default Dashboard;
