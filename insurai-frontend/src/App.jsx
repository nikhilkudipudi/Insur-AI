import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Features from "./components/Features";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";


export default function App() {
  return (
      <BrowserRouter>
    <div className=" flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
             <Route path="/features" element={<Features />} /> 

             <Route path="/admin/*" element={<AdminDashboard />} />
            
              <Route path="/user/*" element={<UserDashboard />} />
          </Routes>
        </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

