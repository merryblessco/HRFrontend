// hooks/useRouteGuard.ts
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Simulate a session retrieval function
const getSession = () => {
  // Replace with your actual session retrieval logic
  return sessionStorage.getItem("userSession");
};

// Custom hook for route guarding
const useRouteGuard = (setUserDetails: (session: string) => void) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle route entry
    const session = getSession();
    if (session) {
      setUserDetails(session);
    } else {
      navigate("/login"); // Redirect to login if no session is found
    }

    // Handle route exit
    return () => {
      // Cleanup logic or actions on route exit, if any
    };
  }, [navigate, location, setUserDetails]);
};

export default useRouteGuard;
