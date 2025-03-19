import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    title: "Deep Focus",
    description: "For concentration and productivity",
    img: waves3,
  },
  {
    title: "Energy Boost",
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
    title: "Commute Companion",
    description: "Tracks for your daily commute",
    img: activities[5].icon,
    color: "rgb(16, 185, 129, 0.4)",
    iconColor: "rgb(16, 185, 129)",
  },
];

const DiscoverMoodCard = ({ mood }) => {
  return (
    <div
      className="h-[23em] w-[23em] rounded-xl flex items-end justify-start p-5 discover-card"
      style={{
        backgroundImage: `url(${mood?.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="font-bold">
        <h3 className="font-bold text-[1.3rem]">{mood?.title}</h3>
        <p>{mood?.description}</p>
      </div>
    </div>
  );
};

const ActivityCard = ({ activity }) => {
  return (
    <div className="flex items-start p-5 gap-5 bg-[#18212f] rounded-3xl">
      <div
        className="h-14 w-14 rounded-md flex items-center justify-center"
        style={{ background: activity.color, color: activity.iconColor }}
      >
        {activity?.img}
      </div>
      <div className="flex flex-col ">
        <h1 className="text-2xl text-slate-200">{activity?.title}</h1>
        <p className="text-slate-400 font-bold">{activity?.description}</p>
      </div>
    </div>
  );
};

const DiscoverPlaylistCard = ({ playlist }) => {
  return (
    <div
      className="h-[23em] w-[23em] rounded-xl flex items-end justify-start p-5 discover-card"
      style={{
        backgroundImage: `url(${playlist?.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      s
      <div className="font-bold">
        <h3 className="font-bold text-[1.3rem]">{playlist?.name}</h3>
        <p>{playlist?.description}</p>
      </div>
    </div>
  );
};

const Discover = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const firstFourDiscoverPlaylists = useSelector((state) =>
    state?.playlists?.aiPlaylists?.slice(0, 4)
  );

  console.log("firstFourDiscoverPlaylists", firstFourDiscoverPlaylists);
  useEffect(() => {
    document.title = "Discover - Spotify";

    try {
      dispatch(fetchGetDiscoverPlaylists());
      dispatch(fetchGetAIPlaylists());
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container m-auto">
            {moodCardData.map((mood) => (
              <DiscoverMoodCard key={mood.title} mood={mood} />
            ))}
          </div>
        </div>

        {/* Discover Playlists by Activity*/}
        <div className="flex flex-col gap-10 container m-auto pb-10">
          <h2 className="text-3xl">Perfect for Your Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container m-auto">
            {activityCardData.map((activity) => (
              <ActivityCard key={activity.title} activity={activity} />
            ))}
          </div>
        </div>

        {/* Discover Recently Generated Playlists*/}
        <div className="flex flex-col gap-10 container m-auto pb-10">
          <h2 className="text-3xl">Recently Generated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container m-auto">
            {firstFourDiscoverPlaylists?.length ? (
              firstFourDiscoverPlaylists?.map((playlist) => (
                <DiscoverPlaylistCard key={playlist.name} playlist={playlist} />
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
