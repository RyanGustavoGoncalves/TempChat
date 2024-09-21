import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = async () => {

      if (token) {

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const responseBody = await response.json();
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);

            // Exibir alerta de erro
            toast.error("Error", {
              description: "Invalid or expired token.",
            });
          }
        } catch (error) {
          // Exibir alerta de erro
          toast.error("Error", {
            description: "Error fetching token!",
          });
          console.error("Internal Error", error);


          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [token, setIsAuthenticated]);

  if (isAuthenticated === null) {
    return null;
  }

  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/auth/login" />;

};

export default ProtectedRoute;
