import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PlayList from "../components/PlayList";

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const name = localStorage.getItem("username");
    setIsLoggedIn(!!token);
    setUsername(name || "");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    alert("Logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#061a24] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 uppercase">
              Vibe Together
            </h1>
            {isLoggedIn && (
              <p className="text-white/70">Welcome, {username}!</p>
            )}
          </div>

          <div className="flex gap-4">
            {isLoggedIn && (
              <Link to="/createPlaylist">
                <button className="bg-gradient-to-r from-cyan-500 to-teal-400 px-5 py-2 rounded-full font-semibold hover:scale-105 transition duration-300 uppercase">
                  + Create Playlist
                </button>
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2 rounded-full font-semibold hover:scale-105 transition duration-300 uppercase"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-gradient-to-r from-green-500 to-emerald-400 px-5 py-2 rounded-full font-semibold hover:scale-105 transition duration-300 uppercase">
                  Login
                </button>
              </Link>
            )}
          </div>
        </header>

        <PlayList />
      </div>
    </div>
  );
}
