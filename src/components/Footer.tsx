import React from 'react';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Copyright */}
          <div>
            <h3 className="text-xl font-bold mb-4">© {new Date().getFullYear()}</h3>
          </div>

          {/* Sponsors */}
          <div>
            <Link to="/sponsors-partners" className="text-xl font-bold hover:text-white transition-colors">
              Sponsors
            </Link>
          </div>

          {/* Partners */}
          <div>
            <Link to="/sponsors-partners" className="text-xl font-bold hover:text-white transition-colors">
              Partners
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="mailto:info@sanskriti-hamburg.de" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}