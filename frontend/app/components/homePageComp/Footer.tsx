
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const footerLinks = {
    'Shop': ['All', 'Minimal Edit', 'Street Prints', 'Essentials'],
    'About': ['Our Story', 'Sustainability', 'Journal'],
    'Support': ['Contact', 'FAQ', 'Shipping & Returns'],
  };

  const socialLinks = ['Instagram', 'TikTok', 'Pinterest'];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-8">
            <h3 className="text-lg font-semibold tracking-wider">JUNHAE STUDIO</h3>
            <p className="mt-4 text-sm text-gray-400">
              Wear your story. Every print is personal.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-gray-200">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 order-2 sm:order-1 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} Junhae Studio. All Rights Reserved.
          </p>
          <div className="flex space-x-6 order-1 sm:order-2">
            {socialLinks.map((social) => (
              <Link key={social} href="/" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">{social}</span>
                {/* In a real app, these would be SVG icons */}
                <div className="h-6 w-6 border rounded-full flex items-center justify-center text-xs">
                  {social.slice(0, 2).toUpperCase()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
