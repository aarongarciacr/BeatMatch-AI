import { useEffect, useState } from "react";
import { fetchUserPlaylists } from "../redux/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "../component/PlaylistCard";
import Footer2 from "../component/Footer/Footer2";

const Playlists = () => {
  const dispatch = useDispatch();

  const playlists = useSelector((state) => state.playlists?.items);
  const status = useSelector((state) => state.playlists?.status);
  const error = useSelector((state) => state.playlists?.error);
  const { next, previous, total } = useSelector(
    (state) => state.playlists?.pagination
  );

  const limit = 10; // Number of playlists per page
  const [offset, setOffset] = useState(0);

  // Fetch playlists whenever offset changes
  useEffect(() => {
    dispatch(fetchUserPlaylists({ limit, offset })); // Fix: Correct parameter passing
  }, [dispatch, offset]); // Re-run when offset changes

  const handleNextPage = () => {
    if (next) {
      const url = new URL(next);
      const newOffset =
        Number(url.searchParams.get("offset")) || offset + limit;
      setOffset(newOffset);
    }
  };

  const handlePrevPage = () => {
    if (previous) {
      const url = new URL(previous);
      const newOffset =
        Number(url.searchParams.get("offset")) || Math.max(offset - limit, 0);
      setOffset(newOffset);
    }
  };

  const handleFirstPage = () => {
    setOffset(0);
  };

  const handleLastPage = () => {
    const lastOffset = Math.max(total - limit, 0);
    setOffset(lastOffset);
  };

  if (status === "loading") {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="h-full pt-[100px] w-full bg-[#111827] gap-5">
      <div className="container mx-auto flex flex-col gap-5 pb-10">
        <h1 className="text-4xl font-bold text-white">My Playlists</h1>

        {/* Total Count */}
        <p className="text-slate-400">
          Showing {offset + 1} - {Math.min(offset + limit, total)} of {total}{" "}
          playlists
        </p>

        {/* Playlists Grid */}
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {playlists &&
            playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
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
              previous
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            onClick={handlePrevPage}
            disabled={!previous}
          >
            Previous
          </button>

          <button
            className={`px-4 py-2 rounded ${
              next
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            onClick={handleNextPage}
            disabled={!next}
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
