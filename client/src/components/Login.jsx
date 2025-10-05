import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useUser();

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:3001/api/auth/login", {
          email,
          password,
        });
        login(res.data.token);
      } else {
        const res = await axios.post(
          "http://localhost:3001/api/auth/signup",
          formData
        );
        login(res.data.token); // auto-login after signup
      }
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      alert(
        err.response?.data?.message ||
          (isLogin ? "Login failed" : "Signup failed")
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1601597115703-7f13a3a9677e?auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 font-semibold rounded-t-lg ${
                isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 font-semibold rounded-t-lg ${
                !isLogin
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={onSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Switch link below form */}
          <p className="mt-4 text-center text-gray-600">
            {isLogin ? "New user? " : "Already have an account? "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
