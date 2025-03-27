import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./redux/authSlice";
import Navbar from "./component/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import GeneratedPlaylistDetails from "./pages/GeneratedPlaylistDetails";
import Discover from "./pages/Discover";
import MoodDiscover from "./pages/MoodDiscover";
import ActivityDiscover from "./pages/ActivityDiscover";
import Lenis from "lenis";

// Initialize Lenis outside of component
const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenis;
};

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    const lenis = initLenis();

    // Cleanup function to destroy Lenis instance
    return () => {
      lenis.destroy();
    };
  }, []);

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
