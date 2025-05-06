import { useState, useEffect } from "react";
import api from "../api/index.js";
import { FaMusic } from "react-icons/fa";

export default function PlayList() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlayLists = async () => {
      try {
        const response = await api.get("/api/playlists?populate=song");
        setPlaylists(response.data.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlayLists();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {playlists.map((playlist, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-[#0f2027] to-[#203a43] text-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex items-center mb-4">
            <FaMusic className="text-white text-2xl mr-2" />
            <h1 className="text-xl font-bold uppercase">{playlist.title}</h1>
          </div>

          {playlist.song?.map((song, i) => (
            <div key={i} className="mb-4">
              <h2 className="text-lg font-semibold uppercase">{song.songTitle}</h2>
              <h3 className="text-sm text-gray-300 mb-1 uppercase">Artist: {song.artist}</h3>
              <a
                href={song.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline text-sm uppercase"
              >
                Listen Now
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
