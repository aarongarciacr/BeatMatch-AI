import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./redux/authSlice";
import Navbar from "./component/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import { useEffect } from "react";
import GeneratedPlaylistDetails from "./pages/GeneratedPlaylistDetails";
import Discover from "./pages/Discover";
import MoodDiscover from "./pages/MoodDiscover";
import ActivityDiscover from "./pages/ActivityDiscover";

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navbar isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/playlists",
        element: <Playlists />,
      },
      {
        path: "/playlists/:id",
        element: <PlaylistDetails />,
      },
      {
        path: "/playlists/BM/:id",
        element: <GeneratedPlaylistDetails />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/discover/mood/:mood",
        element: <MoodDiscover />,
      },
      {
        path: "/discover/activity/:activity",
        element: <ActivityDiscover />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
