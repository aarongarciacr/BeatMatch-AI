import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAddTracks,
  fetchCreatePlaylist,
  fetchFollowPlaylist,
} from "../redux/playlistSlice";
import { moods, activities } from "../constants/moodAndActivities.jsx";
import SpotifyWhiteLogo from "../assets/Spotify_Primary_Logo_RGB_White.png";

const PlaylistCard3 = ({ playlist }) => {
  console.log("playlist", playlist);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moodsObj = moods.reduce((acc, mood) => {
    acc[mood.name] = {
      icon: mood.icon,
      color: mood.color,
      textColor: mood.iconColor,
    };
    return acc;
  }, {});

  const activitiesObj = activities.reduce((acc, activity) => {
    acc[activity.name] = {
      icon: activity.icon,
      color: activity.color,
      textColor: activity.iconColor,
    };
    return acc;
  }, {});

  const handleSpotifyClick = async (e) => {
    e.stopPropagation();
    if (playlist.isFollowed) {
      alert("Playlist already saved on Spotify");
      navigate(`/playlists/${playlist.spotifyId}`);
      return;
    }

    if (playlist.spotifyId) {
      dispatch(fetchFollowPlaylist(playlist.spotifyId));
      alert("Playlist saved on Spotify");
      navigate(`/playlists/${playlist.spotifyId}`);
      return;
    }

    try {
      const trackUris = playlist.tracks.map((track) => track.uri);

      const newPlaylist = await dispatch(fetchCreatePlaylist(playlist));
      const playlistId = newPlaylist.playlist.id;
      if (playlistId) {
        await dispatch(fetchAddTracks(playlistId, trackUris));
      }
      alert("Playlist saved on Spotify");
      navigate(`/playlists/${playlistId}`);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const playlistDuration = playlist?.tracks?.reduce(
    (acc, track) => acc + track.duration_ms,
    0
  );

  const durationHandle = (playlistDuration) => {
    if (playlistDuration < 60000) {
      return `${(playlistDuration / 1000).toFixed(0)}s`;
    } else if (playlistDuration < 3600000) {
      return `${(playlistDuration / 60000).toFixed(0)} min `;
    } else {
      return `${(playlistDuration / 3600000).toFixed(0)}h ${(
        (playlistDuration % 3600000) /
        60000
      ).toFixed(0)} minutes`;
    }
  };
  const playlistImage = playlist.tracks[0]?.album?.images[0]?.url;

  const handleGetMoodIcon = (mood) => {
    return moodsObj[mood].icon;
  };

  const handleGetActivityIcon = (activity) => {
    return activitiesObj[activity].icon;
  };

  const moodColor = moodsObj[playlist.mood].color;
  const moodTextColor = moodsObj[playlist.mood].textColor;
  const activityColor = activitiesObj[playlist.activity].color;
  const activityTextColor = activitiesObj[playlist.activity].textColor;

  return (
    <div className="text-white font-bold flex flex-col lg:flex-row gap-5 rounded-lg w-full min-h-[20em] justify-center items-center p-4">
      {playlistImage && (
        <img
          src={playlistImage}
          alt={playlist.name}
          className="h-[15em] w-[15em] md:h-[18em] md:w-[18em] object-cover rounded-lg md:ml-5 min-h-[15em] md:min-h-[18em]"
        />
      )}
      <div className="flex flex-col justify-evenly px-2 md:px-5 pb-5 flex-1 text-center lg:text-left">
        <div className="flex flex-wrap items-center gap-2 pb-3 justify-center lg:justify-start">
          <div
            className={`px-4 h-[3em] rounded-full w-[fit] flex flex-row items-center justify-center gap-2`}
            style={{
              backgroundColor: moodColor,
              border: `1px solid ${moodTextColor}`,
            }}
          >
            {handleGetMoodIcon(playlist.mood)}
            <p
              className="text-base md:text-[1.2rem]"
              style={{ color: moodTextColor }}
            >
              {playlist.mood}
            </p>
          </div>
          <div
            className={`px-4 h-[3em] rounded-full w-[8em] flex flex-row items-center justify-center gap-2`}
            style={{
              backgroundColor: activityColor,
              border: `1px solid ${activityTextColor}`,
            }}
          >
            {handleGetActivityIcon(playlist.activity)}
            <p
              className="text-base md:text-[1.2rem]"
              style={{ color: activityTextColor }}
            >
              {playlist.activity}
            </p>
          </div>
        </div>
        <h3 className="text-3xl md:text-5xl pb-1 break-words">
          {playlist.name}
        </h3>
        <p className="text-slate-400 py-2 text-base md:text-[1.5rem] break-words">
          {playlist.description}
        </p>
        <p className="text-slate-400 py-2 pb-4 text-sm md:text-[1.2rem]">
          {playlist.tracks.length} tracks • {durationHandle(playlistDuration)}
        </p>
        <div className="flex justify-center lg:justify-start">
          <button
            className="bg-green-500 px-4 h-[3em] text-base md:text-[1.2rem] rounded-full w-fit flex items-center gap-2 hover:bg-green-600 transition-colors"
            onClick={handleSpotifyClick}
          >
            <img
              src={SpotifyWhiteLogo}
              alt="Spotify Logo"
              className="w-4 md:w-5"
            />
            Save on Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard3;
