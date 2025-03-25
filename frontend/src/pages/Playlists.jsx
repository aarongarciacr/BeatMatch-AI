import { useEffect, useState } from "react";
import {
  fetchGetAIPlaylists,
  fetchUserPlaylists,
} from "../redux/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "../component/PlaylistCard";
import Footer2 from "../component/Footer/Footer2";
import SpotifyGreenLogo from "../assets/Spotify_Primary_Logo_RGB_Green.png";

const Playlists = () => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState("Spotify");

  const spotifyPlaylists = useSelector((state) => state.playlists?.items);
  const aiPlaylists = useSelector((state) => state.playlists?.aiPlaylists);

  const status = useSelector((state) => state.playlists?.status);
  const error = useSelector((state) => state.playlists?.error);
  const { next, previous, total } = useSelector(
    (state) => state.playlists?.pagination
  );

  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUserPlaylists({ limit, offset }));
    dispatch(fetchGetAIPlaylists({ page, limit }));
  }, [dispatch, offset, page]);

  const handleNextPage = () => {
    if (isSelected === "Spotify") {
      if (next) {
        try {
          const url = new URL(next);
          const newOffset =
            Number(url.searchParams.get("offset")) || offset + limit;
          setOffset(newOffset);
        } catch (error) {
          console.error("Error parsing next URL:", error);
          // Fallback to simple increment
          setOffset(offset + limit);
        }
      }
    } else {
      if (aiPlaylists?.pagination?.totalPages > page) {
        setPage(page + 1);
      }
    }
  };

  const handlePrevPage = () => {
    if (isSelected === "Spotify") {
      if (previous) {
        try {
          const url = new URL(previous);
          const newOffset =
            Number(url.searchParams.get("offset")) ||
            Math.max(offset - limit, 0);
          setOffset(newOffset);
        } catch (error) {
          console.error("Error parsing previous URL:", error);
          // Fallback to simple decrement
          setOffset(Math.max(offset - limit, 0));
        }
      }
    } else {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  };

  const handleFirstPage = () => {
    if (isSelected === "Spotify") {
      setOffset(0);
    } else {
      setPage(1);
    }
  };

  const handleLastPage = () => {
    if (isSelected === "Spotify") {
      const lastOffset = Math.max(total - limit, 0);
      setOffset(lastOffset);
    } else {
      setPage(Math.floor(aiPlaylists.pagination.totalItems / limit));
    }
  };

  if (status === "loading") {
    return (
      <div className="h-full min-h-screen pt-[100px] w-full flex flex-col backContainer">
        <div className="text-white text-center mt-10">Loading...</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="h-full min-h-screen pt-[100px] w-full flex flex-col backContainer">
        <div className="text-red-500 text-center mt-10">
          {error === "Too many requests"
            ? "Rate limit exceeded. Please try again in a moment."
            : `Error: ${error}`}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen pt-[100px]  w-full flex flex-col backContainer gap-3 sm:gap-5">
      <div className="flex flex-col gap-3 sm:gap-5 container mx-auto px-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <button
            className="bg-[#1F2937] hover:bg-[#263344] px-3 sm:px-4 py-2 rounded-full flex flex-row items-center justify-center"
            style={{
              backgroundColor: isSelected === "Spotify" ? "#103630" : "",
            }}
            onClick={() => setIsSelected("Spotify")}
          >
            <img
              src={SpotifyGreenLogo}
              alt="Spotify Logo"
              className="h-4 w-4 sm:h-5 sm:w-5 mx-1 sm:mx-2"
            />
            <p className="text-[#1ED760] font-bold text-sm sm:text-base">
              Spotify Playlist
            </p>
          </button>

          <button
            className="bg-[#1F2937] hover:bg-[#263344] px-3 sm:px-4 py-2 rounded-full flex flex-row items-center justify-center"
            style={{
              backgroundColor: isSelected === "AI" ? "#33205e" : "",
            }}
            onClick={() => setIsSelected("AI")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-wand-sparkles text-[#8B5CF6] mx-1 sm:mx-2 sm:w-[22px] sm:h-[22px]"
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
            <p className="text-[#8B5CF6] font-bold text-sm sm:text-base">
              AI Generated
            </p>
          </button>
        </div>

        {/* Total Count */}
        {isSelected === "Spotify" ? (
          <p className="text-slate-400 text-sm sm:text-base">
            Showing {offset + 1} - {Math.min(offset + limit, total)} of {total}{" "}
            playlists
          </p>
        ) : (
          <p className="text-slate-400 text-sm sm:text-base">
            Showing {(page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, aiPlaylists?.pagination?.totalItems)} of{" "}
            {aiPlaylists?.pagination?.totalItems} playlists
          </p>
        )}

        {/* Playlists Grid */}
        <div className="gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid grid-cols-1 m-auto sm:-m-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {spotifyPlaylists &&
            isSelected === "Spotify" &&
            spotifyPlaylists?.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}

          {aiPlaylists &&
            isSelected === "AI" &&
            aiPlaylists?.playlists?.map((playlist) => (
              <PlaylistCard key={playlist} playlist={playlist} />
            ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-3 sm:mt-5 flex justify-center items-center gap-2 sm:gap-5 flex-wrap">
          <p
            onClick={handleFirstPage}
            className="cursor-pointer font-bold text-slate-400 text-sm sm:text-base"
          >
            First
          </p>
          <button
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base ${
              (isSelected === "Spotify" && previous) ||
              (isSelected === "AI" && page > 1)
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            onClick={handlePrevPage}
            disabled={
              (isSelected === "Spotify" && !previous) ||
              (isSelected === "AI" && page === 1)
            }
          >
            Previous
          </button>

          <button
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base ${
              (isSelected === "Spotify" && next) ||
              (isSelected === "AI" && page < aiPlaylists.pagination.totalPages)
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            onClick={handleNextPage}
            disabled={
              (isSelected === "Spotify" && !next) ||
              (isSelected === "AI" &&
                page === aiPlaylists.pagination.totalPages)
            }
          >
            Next
          </button>
          <p
            onClick={handleLastPage}
            className="cursor-pointer font-bold text-slate-400 text-sm sm:text-base"
          >
            Last
          </p>
        </div>
      </div>

      <Footer2 />
    </div>
  );
};

export default Playlists;
