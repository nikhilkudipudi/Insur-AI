import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Features from "./components/Features";
import HelpButton from "./components/HelpButton";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";

import ManagePolicies from "./pages/admin/ManagePolicies/ManagePolicies";
import AddNewPolicy from "./pages/admin/ManagePolicies/AddNewPolicy";
import UpdatePolicy from "./pages/admin/ManagePolicies/UpdatePolicy";
import RemovePolicy from "./pages/admin/ManagePolicies/RemovePolicy";
import ViewPolicies from "./pages/admin/ManagePolicies/ViewPolicies";


// Browse Policy Components
import BrowsePolicies from './pages/user/browsePolicies/BrowsePolicies';

import HealthInsurancePolicies from './pages/user/browsePolicies/HealthInsurancePolicies';
import LifeInsurancePolicies from './pages/user/browsePolicies/LifeInsurancePolicies';
import PropertyCasualtyPolicies from './pages/user/browsePolicies/PropertyCasualtyPolicies';
import CommercialInsurancePolicies from './pages/user/browsePolicies/CommercialInsurancePolicies';
import ViewApplyPolicy from './pages/user/browsePolicies/ViewApplyPolicy';
import UserManagePolicies from './pages/user/ManagePolicies';
import FileClaims from './pages/user/FileClaims';
import TrackClaims from './pages/user/TrackClaims';
import Support from './pages/user/Support';
import Profile from './pages/user/Profile';

import Customers from "./pages/admin/Customers";
import Claims from "./pages/admin/Claims";
import AIInsights from "./pages/admin/AIInsights";
import Settings from "./pages/admin/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

import HealthInsurance from "./pages/admin/ManagePolicies/policies/HealthInsurance";
import LifeInsurance from "./pages/admin/ManagePolicies/policies/LifeInsurance";
import PropertyCasualtyInsurance from "./pages/admin/ManagePolicies/policies/PropertyCasualtyInsurance";
import CommercialInsurance from "./pages/admin/ManagePolicies/policies/CommercialInsurance";


const NotFound = () => <div className="p-10 text-center text-red-600">404 - Page Not Found</div>;

// ✅ Wrapper component that handles conditional rendering
function AppContent() {
  const location = useLocation();

  // hide footer for admin and user routes
  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />

          {/* Protected routes */}
          <Route
            path="/admin/*"
            element={<ProtectedRoute element={<AdminDashboard />} role="ADMIN" />}
          />
          <Route
            path="/user/*"
            element={<ProtectedRoute element={<UserDashboard />} role="USER" />}
          />

          {/* Admin manage policies routes */}
          <Route path="/admin/manage-policies" element={<ManagePolicies />} />

          {/* Category pages */}
          <Route path="/admin/manage-policies/health-insurance" element={<HealthInsurance />} />
          <Route path="/admin/manage-policies/life-insurance" element={<LifeInsurance />} />
          <Route path="/admin/manage-policies/property-casualty" element={<PropertyCasualtyInsurance />} />
          <Route path="/admin/manage-policies/commercial-insurance" element={<CommercialInsurance />} />


          {/* Dynamic CRUD pages (single set reused) */}
          <Route path="/admin/manage-policies/:policySegment/add" element={<AddNewPolicy />} />
          <Route path="/admin/manage-policies/:policySegment/update" element={<UpdatePolicy />} />
          <Route path="/admin/manage-policies/:policySegment/remove" element={<RemovePolicy />} />
          <Route path="/admin/manage-policies/:policySegment/view" element={<ViewPolicies />} />



          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/claims" element={<Claims />} />
          <Route path="/admin/analytics" element={<AIInsights />} />
          <Route path="/admin/settings" element={<Settings />} />

          {/* User route */}
          <Route path="/user/browse-policies" element={<BrowsePolicies />} />

          {/* User Browse Policies - Policy Lists (The four new pages) */}
          <Route
            path="/user/browse-policies/health-insurance"
            element={<HealthInsurancePolicies />}
          />
          <Route
            path="/user/browse-policies/life-insurance"
            element={<LifeInsurancePolicies />}
          />
          <Route
            path="/user/browse-policies/property-casualty"
            element={<PropertyCasualtyPolicies />}
          />
          <Route
            path="/user/browse-policies/commercial-insurance"
            element={<CommercialInsurancePolicies />}
          />

          {/* View & Apply Policy Page */}
          <Route
            path="/user/browse-policies/:category/view-apply/:policyId"
            element={<ViewApplyPolicy />}
          />

          {/* Placeholders for other User Dashboard routes */}
          <Route path="/user/manage-policies" element={<UserManagePolicies />} />

          <Route path="/user/file-claims" element={<FileClaims />} />
          <Route path="/user/track-claims" element={<TrackClaims />} />
          <Route path="/user/billing" element={<div>Billing Page...</div>} />
          <Route path="/user/support" element={<Support />} />
          <Route path="/user/profile" element={<Profile />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />


        </Routes>
      </main>


      {/* ✅ Footer visible only for public pages */}
      {!hideFooter && <Footer />}

      {/* Global Help Button */}
      <HelpButton />
    </div>
  );
}

import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

// ✅ Main App export
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
