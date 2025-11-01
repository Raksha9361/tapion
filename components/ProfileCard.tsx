
import React, { useState, useRef, useEffect } from 'react';
import { socialLinks } from '../constants';
import SocialLink from './SocialLink';

const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // State for card rotation based on mouse position
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Handle mouse movement over the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position from the center of the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation values. The further from the center, the more it rotates.
    const rotateY = (mouseX / width - 0.5) * 25; // Max 12.5 deg rotation
    const rotateX = (0.5 - mouseY / height) * 25; // Max 12.5 deg rotation
    
    setRotate({ x: rotateX, y: rotateY });
  };

  // Reset rotation when mouse leaves the card
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Trigger entry animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        w-full max-w-sm transform-gpu preserve-3d rounded-3xl
        bg-gray-800/40 backdrop-blur-md border border-gray-700/60
        shadow-2xl shadow-black/40 transition-all duration-300 ease-out
        ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
      `}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.05)`,
        transition: 'transform 0.1s linear',
      }}
    >
      <div 
        className="p-8 flex flex-col items-center text-center transition-transform duration-500 ease-out"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className={`
          w-28 h-28 rounded-full overflow-hidden border-2 border-purple-500/50
          shadow-lg shadow-purple-900/50 transition-all duration-500
          ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`
        }>
          <img src="https://picsum.photos/seed/tapion/200/200" alt="Tapion" className="w-full h-full object-cover" />
        </div>
        
        <h1 className={`
          mt-6 text-3xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-400 to-blue-400
          transition-all duration-500 delay-100
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
        }>
          Tapion
        </h1>

        <p className={`
          mt-2 text-md font-medium text-gray-300
          transition-all duration-500 delay-200
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
        }>
          Senior Frontend Engineer
        </p>
        
        <p className={`
          mt-4 text-sm text-gray-400
          transition-all duration-500 delay-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}`
        }>
          Crafting beautiful and intuitive web experiences with a passion for animation and design.
        </p>

        <div className={`
          mt-8 flex items-center gap-4
          transition-all duration-500 delay-400
          ${isLoaded ? 'opacity-100' : 'opacity-0'}`
        }>
          {socialLinks.map((link, index) => (
            <SocialLink key={index} href={link.href} icon={link.icon} label={link.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
