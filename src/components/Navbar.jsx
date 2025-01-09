import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { FileText, User, Settings, LogOut } from "lucide-react";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 border-b bg-white/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Resume Perfect AI</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/templates">
                  <Button variant="ghost" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Templates
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="ghost" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </Link>
                <Button variant="outline" className="gap-2" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="gap-2">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="ghost" className="gap-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
