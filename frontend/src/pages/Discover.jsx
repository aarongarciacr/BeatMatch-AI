import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchGetAIPlaylists,
  fetchGetDiscoverPlaylists,
} from "../redux/playlistSlice";
import PlaylistCard from "../component/PlaylistCard";
import Footer from "../component/Footer/Footer1";
import waves1 from "../assets/waves-1.png";
import waves2 from "../assets/waves-2.png";
import waves3 from "../assets/waves-3.png";
import waves4 from "../assets/waves-4.png";
import { activities } from "../constants/moodAndActivities.jsx";

const moodCardData = [
  {
    title: "Happy Vibes",
    description: "Upbeat tunes for your day",
    img: waves1,
  },
  {
    title: "Chill Mood",
    description: "Relaxing beats",
    img: waves2,
  },
  {
    title: "Motivated Mindset",
    description: "Tracks to keep you going",
    img: waves3,
  },
  {
    title: "Energetic Boost",
    description: "High-tempo tracks to keep you going",
    img: waves4,
  },
];
const activityCardData = [
  {
    title: "Workout Mix",
    description: "Get pumped up with these workout tracks",
    img: activities[0].icon,
    color: "rgb(139, 92, 246, 0.4)",
    iconColor: "rgb(139, 92, 246)",
  },
  {
    title: "Study Session",
    description: "Focus and study with these tracks",
    img: activities[1].icon,
    color: "rgb(59, 130, 246, 0.4)",
    iconColor: "rgb(59, 130, 246)",
  },
  {
    title: "Drive Companion",
    description: "Tracks for your daily commute",
    img: activities[5].icon,
    color: "rgb(16, 185, 129, 0.4)",
    iconColor: "rgb(16, 185, 129)",
  },
];

const DiscoverMoodCard = ({ mood, onClick }) => {
  return (
    <div
      className="h-full w-full rounded-xl flex items-end justify-start p-5 discover-card group relative transition-all duration-700 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 md:group-hover:scale-110"
        style={{
          backgroundImage: `url(${mood?.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div className="font-bold relative z-10">
        <h3 className="font-bold text-slate-200 text-[1.3rem] transition-all duration-300 md:group-hover:text-[1.8rem] shadow-2xl">
          {mood?.title}
        </h3>
        <p className="transition-all duration-300 md:group-hover:text-[1.1rem]">
          {mood?.description}
        </p>
      </div>
    </div>
  );
};

const ActivityCard = ({ activity, onClick }) => {
  return (
    <div
      className="flex flex-col sm:flex-row items-center sm:items-start p-3 sm:p-5 gap-3 sm:gap-5 bg-[#18212f] rounded-3xl group transition-all duration-700 cursor-pointer"
      onClick={onClick}
    >
      <div
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-md flex items-center justify-center group-hover:scale-110 transition-all duration-300"
        style={{ background: activity.color, color: activity.iconColor }}
      >
        {activity?.img}
      </div>
      <div className="flex flex-col text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl text-slate-200 group-hover:text-[1.8rem] transition-all duration-300 font-bold">
          {activity?.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-bold group-hover:text-[1.1rem] transition-all duration-300">
          {activity?.description}
        </p>
      </div>
    </div>
  );
};

const DiscoverPlaylistCard = ({ playlist, onClick }) => {
  return (
    <div
      className="h-full w-full rounded-xl flex items-end justify-start p-5 discover-card group transition-all duration-700 overflow-hidden cursor-pointer"
      style={{
        position: "relative",
      }}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${playlist?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div className="font-bold relative z-10">
        <h3 className="font-bold text-[1.3rem] transition-all duration-300 group-hover:text-[1.8rem] shadow-2xl text-slate-200">
          {playlist?.name}
        </h3>
        <p className="transition-all duration-300 group-hover:text-[1.1rem]">
          {playlist?.description}
        </p>
      </div>
    </div>
  );
};

const Discover = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const firstFourDiscoverPlaylists = useSelector(
    (state) => state?.playlists?.aiPlaylists?.playlists
  );

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    document.title = "Discover - Spotify";

    try {
      dispatch(fetchGetDiscoverPlaylists());
      dispatch(fetchGetAIPlaylists({ page: 1, limit: 4 }));
    } catch (error) {
      console.error("Error fetching discover playlists:", error);
    }
  }, [dispatch]);

  const getUserFirst = (user) => {
    if (user) {
      return user.display_name.split(" ")[0];
    }
    return "";
  };

  const handleMoodClick = (mood) => {
    navigate(`mood/${mood.title.replace(/\s+/g, "-")}`);
  };

  const handleActivityClick = (activity) => {
    navigate(`activity/${activity.title.replace(/\s+/g, "-")}`);
  };

  const handlePlaylistClick = (playlist) => {
    navigate(`/playlists/BM/${playlist._id}`);
  };

  return (
    <div className="h-full min-h-screen pt-[100px] w-full flex flex-col backContainer gap-5">
      <div className="flex flex-col gap-5 p-5">
        <div className="container m-auto text-start text-white pb-10">
          <h1 className="text-4xl pb-5 ">
            Welcome Back, {getUserFirst(user)}!
          </h1>
          <p className="font-bold ">
            {" "}
            Here's what we've curated for you today.
          </p>
        </div>

        {/* Discover Playlists by Mood*/}
        <div className="flex flex-col gap-10 container m-auto pb-10">
          <h2 className="text-3xl">Based on Your Mood</h2>
          <div className="h-[40em] sm:h-[20em] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto px-4">
            {moodCardData.map((mood) => (
              <DiscoverMoodCard
                key={mood.title}
                mood={mood}
                onClick={() => handleMoodClick(mood)}
              />
            ))}
          </div>
        </div>

        {/* Discover Playlists by Activity*/}
        <div className="flex flex-col gap-10 container m-auto pb-10">
          <h2 className="text-3xl">Perfect for Your Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container m-auto">
            {activityCardData.map((activity) => (
              <ActivityCard
                key={activity.title}
                activity={activity}
                onClick={() => handleActivityClick(activity)}
              />
            ))}
          </div>
        </div>

        {/* Discover Recently Generated Playlists*/}
        <div className="flex flex-col gap-10 container m-auto pb-10">
          <h2 className="text-3xl">Recently Generated</h2>
          <div className="h-[20em] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 container mx-auto px-4">
            {firstFourDiscoverPlaylists?.length ? (
              firstFourDiscoverPlaylists?.map((playlist) => (
                <DiscoverPlaylistCard
                  key={playlist.name}
                  playlist={playlist}
                  onClick={() => handlePlaylistClick(playlist)}
                />
              ))
            ) : (
              <p>No recently generated playlists</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Discover;
