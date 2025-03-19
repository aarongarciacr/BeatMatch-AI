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
  console.log("aiPlaylists", aiPlaylists);

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
        const url = new URL(next);
        const newOffset =
          Number(url.searchParams.get("offset")) || offset + limit;
        setOffset(newOffset);
      }
    } else {
      if (aiPlaylists.pagination.totalPages > page) {
        setPage(page + 1);
      }
    }
  };
  console.log("page", page);
  const handlePrevPage = () => {
    if (isSelected === "Spotify") {
      if (previous) {
        const url = new URL(previous);
        const newOffset =
          Number(url.searchParams.get("offset")) || Math.max(offset - limit, 0);
        setOffset(newOffset);
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
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  console.log(isSelected === "Spotify" && !previous) ||
    (isSelected === "AI" && page === 1);

  return (
    <div className="h-full min-h-screen pt-[100px] w-full flex flex-col backContainer gap-5">
      <div className="flex flex-col gap-5 container m-auto p-5">
        <h1 className="text-4xl text-white">My Playlists</h1>

        <div className="flex flex-row gap-5">
          <button
            className="bg-[#1F2937] hover:bg-[#263344] px-4 py-2 rounded-full flex flex-row"
            style={{
              backgroundColor: isSelected === "Spotify" ? "#103630" : "",
            }}
            onClick={() => setIsSelected("Spotify")}
          >
            <img
              src={SpotifyGreenLogo}
              alt="Spotify Logo"
              className="h-5 w-5 mx-2"
            />
            <p className="text-[#1ED760] font-bold mr-2">Spotify Playlist</p>
          </button>

          <button
            className="bg-[#1F2937] hover:bg-[#263344] px-4 py-2 rounded-full flex flex-row"
            style={{
              backgroundColor: isSelected === "AI" ? "#33205e" : "",
            }}
            onClick={() => setIsSelected("AI")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-wand-sparkles text-[#8B5CF6] mx-2"
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
            <p className="text-[#8B5CF6] font-bold mr-2">AI Generated</p>{" "}
          </button>
        </div>

        {/* Total Count */}
        {isSelected === "Spotify" ? (
          <p className="text-slate-400">
            Showing {offset + 1} - {Math.min(offset + limit, total)} of {total}{" "}
            playlists
          </p>
        ) : (
          <p className="text-slate-400">
            Showing {(page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, aiPlaylists?.pagination?.totalItems)} of{" "}
            {aiPlaylists?.pagination?.totalItems} playlists
          </p>
        )}

        {/* Playlists Grid */}
        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
        <div className="mt-5 flex justify-center gap-5">
          <p
            onClick={handleFirstPage}
            className="cursor-pointer font-bold text-slate-400"
          >
            First
          </p>
          <button
            className={`px-4 py-2 rounded ${
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
            className={`px-4 py-2 rounded ${
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
            className="cursor-pointer font-bold text-slate-400"
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
