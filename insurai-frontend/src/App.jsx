import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  return (
      <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/features"
              element={
                <div className="text-center mt-10 text-3xl font-semibold text-green-700">
                  Features Page Coming Soon...
                </div>
              }
            />
          </Routes>
        </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

