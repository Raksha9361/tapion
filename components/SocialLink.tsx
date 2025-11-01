
import React from 'react';
import type { SocialLinkProps } from '../types';

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        group p-2 rounded-full bg-gray-700/50 
        hover:bg-purple-600/50 transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75
      "
    >
      <div className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
    </a>
  );
};

export default SocialLink;
