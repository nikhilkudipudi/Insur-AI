import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Features() {
  const navigate = useNavigate();

  // When user visits /features page, redirect to home with scroll flag
  useEffect(() => {
    navigate("/", { state: { scrollToFeatures: true } });
  }, [navigate]);

  return null; // This component doesn't render anything
}