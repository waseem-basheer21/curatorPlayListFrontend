import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api, { setAuthToken } from "../api";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ defaultValues: { identifier: "", password: "" }, mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await api.post("/api/auth/local", data);
      const { jwt, user } = res.data;

      setAuthToken(jwt);
      localStorage.setItem("jwtToken", jwt);
      localStorage.setItem("username", user.username);
      toast.success("Login successful! Redirecting...");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#061a24] p-4">
      <ToastContainer />
      <div className="w-full max-w-5xl bg-gradient-to-tr from-[#0f2027] to-[#2c5364] rounded-xl shadow-lg flex flex-col md:flex-row-reverse overflow-hidden">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-500 to-teal-400 flex flex-col items-center justify-center text-white p-6">
          <h2 className="text-3xl font-bold mb-4">WELCOME BACK!</h2>
          <p className="text-sm text-center">Login to your account to enjoy your playlists.</p>
        </div>

        <div className="w-full md:w-1/2 bg-[#0e2a3b] p-10 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-white/70" />
              <input
                {...register("identifier", { required: "Email or username is required" })}
                placeholder="Username or Email"
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 focus:border-cyan-400"
              />
              {errors.identifier && <p className="text-red-400 text-xs mt-1">{errors.identifier.message}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-white/70 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-2 rounded-full text-white font-bold shadow-lg transition-transform duration-300 ${
                isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-teal-400 hover:scale-105"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-cyan-400">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;