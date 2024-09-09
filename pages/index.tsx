import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaBarcode, FaChartLine, FaPlug } from 'react-icons/fa';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-green-400 min-h-screen flex flex-col">
      <header className="bg-white py-4 shadow">
        <div className="container mx-auto flex justify-between items-center px-6">
          
          <div className="flex items-center">
            <img src="/logo.jfif" alt="AttendEase Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold ml-2">AttendEase</h1>
          </div>

         
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>

          <nav className="hidden md:flex space-x-4">
            
            <Link href="/login" passHref>
              <div className="cursor-pointer text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">Login</div>
            </Link>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white px-6 py-4">
            
            <Link href="/login" passHref>
              <div className="cursor-pointer text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded mt-2">Login</div>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <section className="flex items-center justify-center flex-col text-center py-20">
          <h2 className="text-5xl font-extrabold text-white mb-4">Welcome to AttendEase</h2>
          <p className="text-xl text-white mb-8">Streamlining attendance tracking with ease and efficiency.</p>
          <Link href="/register" passHref>
            <div className="cursor-pointer bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg font-semibold hover:bg-gray-100">
              Get Started
            </div>
          </Link>
        </section>

        
        <section id="features" className="py-16 px-6 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-100 rounded shadow-md">
                <FaBarcode className="mx-auto mb-4 h-12 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Easy Barcode Scanning</h3>
                <p className="text-gray-700">Quickly scan barcodes to mark attendance effortlessly.</p>
              </div>
              <div className="p-6 bg-gray-100 rounded shadow-md">
                <FaChartLine className="mx-auto mb-4 h-12 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">Real-Time Monitoring</h3>
                <p className="text-gray-700">Monitor attendance in real-time with detailed analytics.</p>
              </div>
              <div className="p-6 bg-gray-100 rounded shadow-md">
                <FaPlug className="mx-auto mb-4 h-12 text-yellow-600" />
                <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
                <p className="text-gray-700">Integrates easily with your existing systems.</p>
              </div>
            </div>
          </div>
        </section>
      </main>


      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">&copy; 2024 AttendEase. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="#" passHref>
              <div className="cursor-pointer text-gray-400 hover:text-white">Privacy Policy</div>
            </Link>
            <Link href="#" passHref>
              <div className="cursor-pointer text-gray-400 hover:text-white">Terms of Service</div>
            </Link>
            <Link href="#" passHref>
              <div className="cursor-pointer text-gray-400 hover:text-white">Contact Us</div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
