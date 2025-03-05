import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/authSlice";
import MoodCard from "../component/MoodCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "../component/SearchBar";

const moods = [
  {
    name: "Happy",
    icon: "😊",
  },
  {
    name: "Sad",
    icon: "😢",
  },

  {
    name: "Chill",
    icon: "😌",
  },
  {
    name: "Excited",
    icon: "😆",
  },
  {
    name: "Romantic",
    icon: "😍",
  },
  {
    name: "Energetic",
    icon: "🔥",
  },
  {
    name: "Motivated",
    icon: "💪",
  },

  {
    name: "Calm",
    icon: "🧘",
  },
];

const activities = [
  {
    name: "Workout",
    icon: "🏋️",
  },
  {
    name: "Study",
    icon: "📚",
  },
  {
    name: "Party",
    icon: "🎉",
  },
  {
    name: "Focus",
    icon: "🧘",
  },
  {
    name: "Sleep",
    icon: "😴",
  },
  {
    name: "Drive",
    icon: "🚗",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user); // <-- Get user from Redux
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-[100vh] pt-[100px] w-[100%] flex flex-col bg-[#111827] gap-5">
      <div className="h-[20em] p-5 rounded-3xl bg-[#1F2937] w-[70%] m-auto flex flex-col gap-2">
        <h1 className="text-3xl text-slate-200 font-bold">
          Welcome back, {user?.display_name?.split(" ")[0]}!
        </h1>
        {user && (
          <div className="text-slate-300 font-bold">
            <h2 className="text-[1.2rem]">Your Spotify Profile</h2>
            <div className="text-slate-400">
              <p>{user.email}</p>
              <p>{user.followers.total} followers</p>
              <a className="underline" href={user.external_urls.spotify}>
                Open Spotify Profile
              </a>
            </div>
          </div>
        )}
        <a href="/playlists">View Playlists</a>
      </div>
      <div className="h-[80vh] w-[70%] m-auto p-5 flex flex-col gap-5 bg-[#1f2937] rounded-3xl">
        <p className="text-slate-300 font-bold text-2xl">
          Let's create your perfect playlist for today.
        </p>
        <div className="flex flex-col gap-5">
          <p className="text-slate-300 font-bold">Mood</p>
          <div className="flex flex-row gap-5 items-center justify-center">
            {moods.map((mood, index) => (
              <MoodCard key={index} mood={mood} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-slate-300 font-bold">Activity</p>
          <div className="flex flex-row gap-5 items-center justify-center">
            {activities.map((mood, index) => (
              <MoodCard key={index} mood={mood} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-slate-300 font-bold">Favorite Artists & Genres</p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
