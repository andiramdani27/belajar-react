import { useState } from 'react';
import { Menu, X, LayoutTemplate } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo area */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <LayoutTemplate className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">FlexiTemplate</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Contact</a>
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md">
                Get Started
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 rounded-md p-2 transition-colors"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100 visible' : 'max-h-0 opacity-0 invisible'} overflow-hidden bg-white border-t border-gray-100`}>
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-700 bg-indigo-50">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">About</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">Services</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">Contact</a>
            <div className="pt-2">
              <button className="w-full text-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm mt-1">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center justify-center min-h-[50vh] text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Ready to Build
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Master Figma Target <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Ready for Sections
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            This is a clean, responsive master template. The header features a functional mobile menu, and the footer is set up at the bottom. Start adding your Figma designs right here.
          </p>

          <div className="p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-white w-full max-w-4xl shadow-sm flex items-center justify-center min-h-[300px]">
            <p className="text-gray-400 font-medium text-lg flex flex-col items-center gap-3">
              <LayoutTemplate className="w-12 h-12 text-gray-300" />
              Inject your new UI components here
            </p>
          </div>

        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-gray-800 pb-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-500 p-1.5 rounded-md">
                  <LayoutTemplate className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">FlexiTemplate</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A solid starting point for your next great web application, fully responsive and modern.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} FlexiTemplate. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
