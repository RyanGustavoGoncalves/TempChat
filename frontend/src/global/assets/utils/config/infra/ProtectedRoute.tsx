import { useState, useEffect, ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  element: ComponentType<any>;
  [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await fetch(`${process.env.SPRING_APP_URL}/token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const responseBody = await response.json();
            const role = responseBody.role;
            localStorage.setItem('role', role);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('role');
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

          localStorage.removeItem('role');
          setIsAuthenticated(false);
        }
      } else {
        localStorage.removeItem('role');
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [token, setIsAuthenticated]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/Welcome" />;
};

export default ProtectedRoute;
