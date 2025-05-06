import { useState } from "react";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlaylistForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    mood: "",
    song: [{ songTitle: "", artist: "", link: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedSongs = formData.song.map((s) => ({
      songTitle: s.songTitle,
      artist: s.artist,
      link: s.link,
    }));

    try {
      await api.post("/playlists", {
        data: { ...formData, song: formattedSongs },
      });
      toast.success("Playlist created successfully!");
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch (error) {
      console.error("Error creating playlist:", error.response?.data?.error || error.message);
      toast.error("Failed to create playlist");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSong = () => {
    setFormData({
      ...formData,
      song: [...formData.song, { songTitle: "", artist: "", link: "" }],
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#061a24] p-4">
      <ToastContainer position="top-right" />
      <div className="w-full max-w-4xl bg-gradient-to-tr from-[#0f2027] to-[#2c5364] rounded-xl shadow-lg overflow-hidden text-white p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Create a Playlist</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Playlist Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border-b-2 border-white/50 placeholder-white/70 focus:outline-none focus:border-cyan-400"
          />
          <input
            type="text"
            placeholder="Mood"
            value={formData.mood}
            onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border-b-2 border-white/50 placeholder-white/70 focus:outline-none focus:border-cyan-400"
          />

          <div className="space-y-6">
            {formData.song.map((song, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Song Title"
                  value={song.songTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      song: formData.song.map((s, i) =>
                        i === index ? { ...s, songTitle: e.target.value } : s
                      ),
                    })
                  }
                  className="px-4 py-2 bg-transparent border-b-2 border-white/50 placeholder-white/70 focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="text"
                  placeholder="Artist"
                  value={song.artist}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      song: formData.song.map((s, i) =>
                        i === index ? { ...s, artist: e.target.value } : s
                      ),
                    })
                  }
                  className="px-4 py-2 bg-transparent border-b-2 border-white/50 placeholder-white/70 focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={song.link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      song: formData.song.map((s, i) =>
                        i === index ? { ...s, link: e.target.value } : s
                      ),
                    })
                  }
                  className="px-4 py-2 bg-transparent border-b-2 border-white/50 placeholder-white/70 focus:outline-none focus:border-cyan-400"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSong}
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-full font-semibold transition duration-300"
          >
            + Add Another Song
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-full font-bold shadow-lg transition-transform duration-300 ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-teal-400 hover:scale-105"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Playlist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaylistForm;
