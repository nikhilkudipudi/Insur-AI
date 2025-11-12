import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./utils/auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Features from "./components/Features";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ManagePolicies from "./pages/admin/ManagePolicies/ManagePolicies";
import AddNewPolicy from "./pages/admin/ManagePolicies/AddNewPolicy";
import UpdatePolicy from "./pages/admin/ManagePolicies/UpdatePolicy";
import RemovePolicy from "./pages/admin/ManagePolicies/RemovePolicy";
import ViewPolicies from "./pages/admin/ManagePolicies/ViewPolicies";

import UserBrowsePolicies from "./components/UserBrowsePolicies";
import Customers from "./pages/admin/Customers";
import Claims from "./pages/admin/Claims";
import AIInsights from "./pages/admin/AIInsights";
import Settings from "./pages/admin/Settings"


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
           <Route
  path="/admin/*"
  element={
    isAuthenticated() && getUserRole() === "ADMIN"
      ? <AdminDashboard />
      : <Navigate to="/login" />
  }
/>
          <Route path="/admin/manage-policies" element={<ManagePolicies />} />
          
            <Route path="/user/*" element={<UserDashboard />} />
      <Route path="/user/browse-policies" element={<UserBrowsePolicies />} />

<Route path="/admin/manage-policies/add" element={<AddNewPolicy />} />
<Route path="/admin/manage-policies/update" element={<UpdatePolicy />} />
<Route path="/admin/manage-policies/remove" element={<RemovePolicy />} />
<Route path="/admin/manage-policies/view" element={<ViewPolicies />} />

          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/claims" element={<Claims />} />
         <Route path="/admin/analytics" element={<AIInsights />} />
         <Route path="/admin/settings" element={<Settings />} />
          </Routes>
        </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

