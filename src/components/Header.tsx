import { useState } from 'react';
import { Menu, X, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black bg-opacity-90 backdrop-blur-md text-white py-3 px-6 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Apple className="h-5 w-5" />
            <a href="/" className="text-xl font-medium">
              Gift Cards
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#cards" className="text-sm hover:text-gray-300 transition-colors">
              Карты
            </a>
            <a href="#how-to-use" className="text-sm hover:text-gray-300 transition-colors">
              Как использовать
            </a>
            <a href="#faq" className="text-sm hover:text-gray-300 transition-colors">
              Вопросы и ответы
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a 
              href="#cards" 
              className="block text-sm py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Карты
            </a>
            <a 
              href="#how-to-use" 
              className="block text-sm py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Как использовать
            </a>
            <a 
              href="#faq" 
              className="block text-sm py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Вопросы и ответы
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
