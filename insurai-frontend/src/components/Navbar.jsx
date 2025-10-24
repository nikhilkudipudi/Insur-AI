import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* LOGO */}
      <h1
        className="text-2xl font-bold bg-[url('/leaf-logo.png')] bg-no-repeat bg-left pl-10 bg-contain"
      >
        InsurAI
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/features")}
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Features
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
