import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Home } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">


          {/* About the organisation */}
          <div className='text-gray-400'>
            <p className='text-xs text-gray-400'>
              Sanskriti e.V. is a registered non-profit organization based in Hamburg, Germany. 
              <br /><br />
              Verein Nummer: VR 25931
              <br /><br />
              Bank Account: <br />
              IBAN: DE xx xx xx xx xx xx xx xx <br />
              Kontoinhaber: Sanskriti e.V. <br />
            </p>
          </div>

          {/* Useful links including Sponsors, Partners, etc */}
            <div className='text-white-900'>
              <div className='grid grid-cols-1 gap-8 justify-center'>
                <div className='flex justify-center text-center'>
                  {/* <span className='text-sm'>
                    <Link to='/sponsors-partners#sponsors'>Sponsors</Link>
                  </span> */}
                </div>
                <div className='flex justify-center text-center'>
                  {/* <span className='text-sm'>
                    <Link to='/sponsors-partners#partners'>Partners</Link>
                  </span> */}
                </div>
              </div>
            </div>

          {/* Contact Information */}
          <div className='text-white-900'>
            <div className='grid grid-cols-1 gap-2'>
              <div className='flex align-center items-center'>
                <Home className='w-4 h-4 inline-block mr-2 text-gray-400' />
                <span className='text-sm'>Hamburg, Germany</span>
              </div>
              <div className='flex align-center items-center'>
                <Mail className='w-4 h-4 inline-block mr-2 text-gray-400' />
                <span className='text-sm'>
                  <a href="mailto:admin@sanskriti-hamburg.de">admin@sanskriti-hamburg.de</a>
                </span>
              </div>
              <div className='flex align-center items-center'>
                <span className="mr-2">
                  <FaWhatsapp size={16} color="#9CA3AF" />
                </span>
                <span className='text-sm'>
                  +49 123 456 7890
                </span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-4 mt-4 border-t border-gray-800">
          <div className="flex justify-center space-x-6 text-gray-500 text-xs">
            Sanskriti e.V. &copy; {new Date().getFullYear()} | All Rights Reserved
            
          </div>
        </div>
      </div>
    </footer>
  );
}