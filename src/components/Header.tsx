import { Button } from "@/components/ui/button";
import { Home, MapPin, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Farm House Rentals</h1>
              <p className="text-sm text-muted-foreground">Hyderabad & Nearby</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/listings" className="text-foreground hover:text-primary transition-colors">
              Properties
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/seller">
                <User className="w-4 h-4" />
                Seller Login
              </Link>
            </Button>
            <Button variant="nature" size="sm" asChild>
              <Link to="/admin">
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;