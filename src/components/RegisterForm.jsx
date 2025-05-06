import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api, { setAuthToken } from "../api";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { username: "", email: "", password: "" },
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    clearErrors();
    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/local/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      setAuthToken(response.data.jwt);
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/createPlaylist";
      }, 2000);
    } catch (error) {
      console.error("API Error:", error.response?.data);

      const message = error?.response?.data?.error?.message?.toLowerCase();
      const details = error?.response?.data?.error?.details?.errors;

      if (details?.length) {
        details.forEach((err) => {
          const field = err.path?.[0] || err.name || "";
          if (field === "email") {
            setError("email", {
              type: "manual",
              message: "Email is already in use",
            });
            toast.error("Email is already in use");
          } else if (field === "username") {
            setError("username", {
              type: "manual",
              message: "Username is already taken",
            });
            toast.error("Username is already taken");
          }
        });
      } else if (message) {
        if (message.includes("email") && !message.includes("username")) {
          setError("email", {
            type: "manual",
            message: "Email is already in use",
          });
          toast.error("Email is already in use");
        } else if (message.includes("username") && !message.includes("email")) {
          setError("username", {
            type: "manual",
            message: "Username is already taken",
          });
          toast.error("Username is already taken");
        } else {
          toast.error("Registration failed: Username or email already taken");
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#061a24] p-4">
      <ToastContainer position="top-right" />
      <div className="w-full max-w-5xl bg-gradient-to-tr from-[#0f2027] to-[#2c5364] rounded-xl shadow-lg flex flex-col md:flex-row-reverse overflow-hidden animate-fade-in">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-500 to-teal-400 flex flex-col items-center justify-center text-white p-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            WELCOME!
          </h2>
          <p className="text-sm sm:text-base text-center max-w-sm">
            Create your account to start building playlists and enjoy music
            tailored to your vibe!
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-[#0e2a3b] p-8 md:p-10 flex flex-col justify-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Register
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-white/70" />
              <input
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-cyan-400"
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="relative">
              <MdEmail className="absolute top-3 left-3 text-white/70" />
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-cyan-400"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-4 pr-10 py-2 bg-transparent border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-white/70 hover:text-white"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-2 rounded-full text-white font-bold shadow-lg transition-transform duration-300 ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-teal-400 hover:scale-105"
              }`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-cyan-400 cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
