import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // <-- Get user from Redux
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="h-[100vh] pt-[100px] w-[100%] flex flex-col bg-[#111827] ">
      <div className="h-[12em] p-5 bg-[#1ED760] w-[70%] m-auto">
        <h1 className="text-3xl text-slate-200 font-bold">
          Welcome back, {user.display_name.split(" ")[0]}!
        </h1>
        {user && (
          <div className="text-slate-300">
            <h2>Your Spotify Profile</h2>
            <p>{user.email}</p>
            <p>{user.followers.total} followers</p>
            <p>{user.external_urls.spotify}</p>
          </div>
        )}
        <a href="/playlists">View Playlists</a>
      </div>
      <div>
        <p>Let's create your perfect playlist for today.</p>
        <div>
          <p>Mood</p>
          <div>
            <MoodCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
