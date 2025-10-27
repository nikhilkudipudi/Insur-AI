import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Features from "./components/Features";

export default function App() {
  return (
      <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
              <Route path="/features" element={<Features />} /> 
            
          </Routes>
        </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

