import { useState, useEffect } from "react";

// Example genre list (you can fetch this from Spotify if you want to make it dynamic)
const availableGenres = [
  "lo-fi",
  "Pop",
  "Rock",
  "Hip-Hop",
  "Jazz",
  "Classical",
  "Electronic",
  "Reggae",
  "Country",
  "R&B",
  "Metal",
  "Blues",
  "Folk",
  "Soul",
  "Punk",
  "Indie",
  "Dance",
  "Alternative",
  "House",
  "Techno",
  "Trance",
  "Dubstep",
  "Drum and Bass",
  "Garage",
  "Grime",
  "Jungle",
  "Reggaeton",
  "Salsa",
  "Bachata",
  "Merengue",
  "Cumbia",
  "Samba",
  "Forró",
  "Bossa Nova",
  "Norteño",
  "Mariachi",
  "Banda",
  "Ranchera",
  "Duranguense",
  "Corridos",
  "Tejano",
  "Conjunto",
  "Zydeco",
  "Corridos Tumbados",
  "Trap Corridos",
  "Trap Latino",
  "Grupera",
];

const SearchBar = ({ onSelectedItemsChange }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchType, setSearchType] = useState("artist");

  useEffect(() => {
    onSelectedItemsChange(selectedItems); // Notify parent when items change
  }, [selectedItems, onSelectedItemsChange]);

  const fetchSearchResults = async (query, type = "artist") => {
    if (type === "genre") {
      const filteredGenres = availableGenres.filter((genre) =>
        genre.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredGenres.map((g) => ({ name: g, type: "genre" })));
      return;
    }

    try {
      const response = await fetch(
        `/api/search/artists?q=${query}&type=${type}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setResults([]);
        return;
      }

      const data = await response.json();
      setResults(
        data.artists?.items.map((artist) => ({
          id: artist.id,
          name: artist.name,
          image: artist.images?.[0]?.url,
          type: "artist",
        })) || []
      );
    } catch (error) {
      setResults([]);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim()) {
      fetchSearchResults(e.target.value, searchType);
    } else {
      setResults([]);
    }
  };

  const handleSelectItem = (item) => {
    if (!selectedItems.some((selected) => selected.name === item.name)) {
      setSelectedItems([...selectedItems, item]);
    }
    setInput("");
    setResults([]);
  };

  const removeSelectedItem = (name) => {
    setSelectedItems(selectedItems.filter((item) => item.name !== name));
  };

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex gap-4 mb-2">
        <button
          className={`px-4 py-2 rounded-lg ${
            searchType === "artist"
              ? "bg-green-500 text-white"
              : "bg-gray-200 transition-colors hover:bg-gray-300"
          }`}
          onClick={() => setSearchType("artist")}
        >
          Search Artists
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            searchType === "genre" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSearchType("genre")}
        >
          Search Genres
        </button>
      </div>

      <div className="input-wrapper bg-white w-full rounded-lg h-[2.5rem] px-4 shadow-lg flex items-center">
        <input
          type="text"
          placeholder={`Search for ${
            searchType === "artist" ? "artists" : "genres"
          }`}
          className="bg-transparent border-none focus:outline-none w-full h-full"
          value={input}
          onChange={handleChange}
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">
          {results.map((item) => (
            <div
              key={item.name}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
              onClick={() => handleSelectItem(item)}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>{item.name}</span>
              {item.type === "genre" && (
                <span className="ml-auto text-xs text-gray-500">Genre</span>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              {item.name}
              <button
                className="ml-2 text-red-500 font-bold"
                onClick={() => removeSelectedItem(item.name)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
