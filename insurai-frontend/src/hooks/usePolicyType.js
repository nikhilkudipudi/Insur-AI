// src/hooks/usePolicyType.js
import { useLocation } from "react-router-dom";

/**
 * Returns:
 *  - segment: the URL segment like "health-insurance"
 *  - policyType: canonical uppercase like "HEALTH"
 */
export function usePolicyType() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  // parts example: ["admin","manage-policies","health-insurance","view"]
  // segment should be index 2 (after admin/manage-policies)
  const segment = parts[2] || null;

  const typeMap = {
    "health-insurance": "HEALTH",
    "life-insurance": "LIFE",
    "property-casualty-insurance": "PROPERTY",
    "commercial-insurance": "COMMERCIAL",
  
  };

  const policyType = segment ? (typeMap[segment] || segment.toUpperCase()) : null;
  return { segment, policyType };
}
