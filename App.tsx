
import React, { useState, useEffect } from 'react';

// Add this type declaration for the Swiper global object
declare global {
  interface Window {
    Swiper: any;
  }
}

// FloatingCard component for hero background elements
interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isLoaded: boolean;
  delay?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className, style, isLoaded, delay = 0 }) => {
  return (
    <div
      className={`absolute rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/50 p-4 sm:p-6 text-white transition-all duration-1000 ease-out transform-gpu ${className} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Testimonial Card for marquee
const TestimonialCard: React.FC<{ quote: string; name: string; role: string; avatarUrl: string; }> = ({ quote, name, role, avatarUrl }) => (
  <div className="flex-shrink-0 w-80 sm:w-96 mx-4 p-8 bg-white/5 border border-white/10 rounded-2xl text-left backdrop-blur-sm">
    <p className="text-3xl text-gray-500">“</p>
    <p className="mt-4 text-gray-300 h-32">{quote}</p>
    <div className="mt-6 flex items-center">
      <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div className="ml-4">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

// FAQ Item Component
const FaqItem: React.FC<{ q: string; a: string; isOpen: boolean; onClick: () => void; isLoaded: boolean; delay: number; }> = ({ q, a, isOpen, onClick, isLoaded, delay }) => (
  <div 
    className={`bg-white/5 border border-white/10 rounded-2xl p-6 my-2 text-left transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <button onClick={onClick} className="w-full flex justify-between items-center text-left">
      <span className="text-md font-semibold text-white">{q}</span>
      <div className="relative w-5 h-5 flex-shrink-0 ml-4 flex items-center justify-center bg-gray-700 rounded-full">
        <div className={`absolute w-3 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}></div>
        <div className={`absolute w-3 h-0.5 bg-white transition-transform duration-300 rotate-90`}></div>
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
      <p className="text-gray-400 text-sm">{a}</p>
    </div>
  </div>
);


// Main App Component
const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);


  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const themeImages = [
      "https://card.groarz.in/img/vCards/gym.png",
      "https://card.groarz.in/img/vCards/lawyer.png",
      "https://card.groarz.in/img/vCards/chef.png",
      "https://card.groarz.in/img/vCards/architect.png",
      "https://card.groarz.in/img/vCards/restaurant.png",
      "https://card.groarz.in/img/vCards/school.png",
      "https://card.groarz.in/img/vCards/musician.png",
      "https://card.groarz.in/img/vCards/makeup-artist.png",
      "https://card.groarz.in/img/vCards/doctor.png",
      "https://card.groarz.in/img/vCards/wedding-1.png",
  ];

  useEffect(() => {
    let swiper: any;
    // Delay initialization slightly to ensure DOM is ready and script is loaded
    const initSwiper = () => {
        if (window.Swiper) {
            swiper = new window.Swiper('.swiper-container', {
                effect: 'coverflow',
                grabCursor: true,
                initialSlide: 2,
                speed: 3000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                centeredSlides: true,
                slidesPerView: 'auto',
                loop: true,
                freeModeSticky: false,
                coverflowEffect: {
                    rotate: 10,
                    stretch: 20,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                },
            });
        }
    };
    
    const timer = setTimeout(initSwiper, 100);

    return () => {
        clearTimeout(timer);
        if (swiper) {
            swiper.destroy(true, true);
        }
    };
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget;
    const x = (clientX - offsetWidth / 2) / 40;
    const y = (clientY - offsetHeight / 2) / 40;
    setTranslate({ x, y });
  };

  const handleMouseLeave = () => setTranslate({ x: 0, y: 0 });

  const handleFaqClick = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const companyLogos = [
    "Vortex", "Quantum", "Stellar", "Apex", "NovaWorks", "Zenith"
  ];

  const digitalCardTemplates = [
    "Software Developer", "Photographer", "Doctor", "Flower Shop",
    "Makeup Artist", "Beauty Spa", "Restaurant", "Yoga",
    "Interior Designer", "Gym / Fitness", "Travel Agency", "Wedding"
  ];
  const whatsappStoreTemplates = ["Fashion", "Jewellery Shop", "Travel Agency", "Wedding"];

  const howItWorksSteps = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
      title: "1. Activate Your Card",
      description: "Receive your Tapion card and activate it in seconds through our secure portal."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
      title: "2. Create Your Profile",
      description: "Personalize your digital profile with contact details, social links, and more."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 12c0 2.42-.943 4.638-2.5 6.316M5.25 9.75A7.5 7.5 0 0112 4.5c1.33 0 2.573.285 3.685.786m-6.44 2.122a7.5 7.5 0 00-1.28 5.175A7.5 7.5 0 0012 21.75c2.42 0 4.638-.943 6.316-2.5M12 9.75a3 3 0 110 6 3 3 0 010-6z" /></svg>,
      title: "3. Tap & Share",
      description: "Simply tap your card on any NFC-enabled smartphone to instantly share your profile."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
      title: "4. Grow Your Network",
      description: "Manage your connections and track interactions with our powerful dashboard."
    }
  ];

  const stats = [
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '50K+', label: 'Active Stores' },
    { value: '24/7', label: 'Smart Support' },
  ];

  const pricingPlans = [
    {
      title: 'Digital Business Card', price: '₹149',
      description: 'Pay monthly, stay for a year! This plan is billed every month, but requires a one-year subscription period.',
      features: [
        { name: 'Card Features', items: [
          { text: '1 vCards', included: true }, { text: '10 Services', included: true }, { text: '10 Products', included: true },
          { text: '10 Links', included: true }, { text: '2 Payment Listed', included: true }, { text: '10 Galleries', included: true },
          { text: '10 Testimonials', included: true }, { text: 'Business Hours', included: true }, { text: 'Appointments', included: true },
          { text: 'Contact Form', included: true }, { text: '100 Enquiries', included: true }, { text: 'Password Protected', included: true },
          { text: '50MB storage limit', included: true },
        ]},
        { name: 'Additional Features', items: [
          { text: 'Advanced Settings', included: true }, { text: 'Progressive Web App (PWA)', included: true }, { text: 'Personalized Link', included: true },
          { text: 'Free Support', included: true }, { text: 'Order NFC Card', included: true }, { text: 'Hide Branding', included: false },
          { text: 'Free Setup', included: false }, { text: 'Custom Domain', included: false },
        ]}
      ]
    },
    {
      title: 'Online Store', price: '₹249',
      description: 'Pay monthly, stay for a year! This plan is billed every month, but requires a one-year subscription period.',
      features: [
        { name: 'Card Features', items: [
          { text: '1 Stores', included: true }, { text: '20 Categories', included: true }, { text: '20 Products', included: true },
        ]},
        { name: 'Additional Features', items: [
           { text: 'Order NFC Card', included: true }, { text: '50MB storage limit', included: true }, { text: 'Advanced Settings', included: true }, 
           { text: 'Progressive Web App (PWA)', included: true }, { text: 'Personalized Link', included: true }, { text: 'Free Support', included: true },
           { text: 'Hide Branding', included: false }, { text: 'Free Setup', included: false }, { text: 'Custom Domain', included: false },
        ]}
      ]
    },
    {
      title: 'Both Plan', price: '₹599',
      description: 'Pay monthly, stay for a year! This plan is billed every month, but requires a one-year subscription period.',
      features: [
        { name: 'Card Features', items: [
          { text: '10 vCards', included: true }, { text: '50 Services', included: true }, { text: '50 Products', included: true }, { text: '50 Links', included: true },
          { text: '10 Payment Listed', included: true }, { text: '20 Galleries', included: true }, { text: '20 Testimonials', included: true },
          { text: 'Business Hours', included: true }, { text: 'Appointments', included: true }, { text: 'Contact Form', included: true },
          { text: '500 Enquiries', included: true }, { text: 'Password Protected', included: true },
        ]},
        { name: 'Store Features', items: [
          { text: '10 Stores', included: true }, { text: '50 Categories', included: true }, { text: '100 Products', included: true }, { text: 'Order NFC Card', included: true },
        ]},
        { name: 'Additional Features', items: [
          { text: '100MB storage limit', included: true }, { text: 'Advanced Settings', included: true }, { text: 'Progressive Web App (PWA)', included: true },
          { text: 'Personalized Link', included: true }, { text: 'Free Support', included: true }, { text: 'Hide Branding', included: false },
          { text: 'Free Setup', included: false }, { text: 'Custom Domain', included: false },
        ]}
      ]
    },
  ];

  const setupFees = [
    { title: 'NFC Card', price: '₹699', description: 'Pay once - get your personalized NFC Digital' },
    { title: 'For Setup Digital Business Card', price: '₹199', description: 'One-time setup to make your card pixel-perfect' },
    { title: 'For Setup Online Store', price: '₹299', description: 'One-time setup to make your card pixel-perfect' },
  ];

  const testimonials = [
    { quote: "The digital vCard feature from Tapion's Card is a game-changer. I can share my business card instantly with clients, and it always looks professional.", name: 'Priya M', role: 'Freelance Consultant', avatarUrl: 'https://i.pravatar.cc/150?u=priya' },
    { quote: "Managing orders has never been easier. Tapion's Card's admin panel is intuitive, and I can track all my sales effortlessly.", name: 'Arjun K', role: 'Small Business Owner', avatarUrl: 'https://i.pravatar.cc/150?u=arjun' },
    { quote: "I love the theme options! I found a design that perfectly matches my brand and makes my business stand out.", name: 'Neha T', role: 'Fashion Boutique Owner', avatarUrl: 'https://i.pravatar.cc/150?u=neha' },
    { quote: "The WhatsApp store integration transformed the way I sell. My customers love ordering directly through WhatsApp—it's so convenient and fast!", name: 'Rohit S', role: 'Online Retailer', avatarUrl: 'https://i.pravatar.cc/150?u=rohit' },
    { quote: "Setting up my online store was surprisingly simple. The support team was also incredibly helpful in guiding me through the process.", name: 'Anjali D', role: 'Home Baker', avatarUrl: 'https://i.pravatar.cc/150?u=anjali' },
  ];

  const faqs = [
    { q: "What is the Tapion Digital Business Card?", a: "It's a modern, digital alternative to traditional paper business cards. You can create a personalized, interactive card with your contact info, services, photo gallery, and more, all accessible via a unique link." },
    { q: "Can I update my business card after sharing it?", a: "Yes, absolutely! You can log in to your dashboard anytime to update your details, add new services, or change your theme. The changes will reflect instantly on your live card." },
    { q: "How do I create my digital business card on Tapion?", a: "It's simple! Just sign up for a plan, choose a template, and use our intuitive editor to add your information. You can have your professional digital card ready in minutes." },
    { q: "Is my data safe and private with Tapion?", a: "We take data security very seriously. All your information is encrypted and stored securely. We do not share your data with third parties without your consent." },
    { q: "What features are included in a Tapion Digital Business Card?", a: "Our cards support a wide range of features including photo galleries, service listings, appointment booking, vCard download, social media links, and even an integrated WhatsApp store." },
    { q: "Is the service eco-friendly?", a: "Yes! By going digital, you're helping to reduce paper waste and save trees, making it a sustainable choice for networking." },
    { q: "How do I share my digital business card?", a: "You can share your card via its unique link through email, SMS, WhatsApp, social media, or by using a QR code. For a more direct approach, you can also use our NFC-enabled physical cards." },
    { q: "Can I use Tapion cards for my entire team or company?", a: "Definitely. We offer solutions for teams and businesses of all sizes, allowing for consistent branding and easy management of multiple cards." },
    { q: "Does the recipient need to install any app to view my card?", a: "No, not at all. Your digital card opens directly in any web browser on any device, ensuring a seamless experience for everyone." },
    { q: "What are the pricing plans for Tapion Digital Business Card?", a: "We offer several affordable plans to suit different needs, from individual digital cards to full online stores. Please refer to our 'Affordable Pricing Plans' section for detailed information." },
    { q: "What is a WhatsApp Store in Tapion's Card?", a: "It's an integrated e-commerce feature that allows you to display and sell your products directly from your digital business card through WhatsApp, making it easy for customers to browse and order." },
    { q: "How does the NFC Card work with Tapion's Card?", a: "The optional NFC card is a physical card that you can tap on a compatible smartphone. This action instantly opens your digital business card in the phone's browser, providing a futuristic and impressive way to network." },
  ];

  return (
    <div className="bg-[#0d0d0d] text-white overflow-x-hidden">
      <header className={`fixed top-0 left-0 right-0 p-4 sm:p-8 z-30 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : '-translate-y-4 opacity-0'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold">Tapion</span>
          <a
            href="#pricing"
            onClick={handlePricingClick}
            className="px-5 py-2 text-sm font-semibold text-black bg-white rounded-lg shadow-lg hover:bg-gray-200 transition-colors"
          >
            Pricing
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col items-center justify-center w-full min-h-screen text-white overflow-hidden p-4 sm:p-8"
        >
          <div className="relative w-full h-full flex items-center justify-center preserve-3d" style={{ perspective: '2000px' }}>
            <div 
              className="transition-transform duration-300 ease-out w-full h-full preserve-3d" 
              style={{ transform: `rotateY(${-translate.x}deg) rotateX(${translate.y}deg)`}}
            >
              {/* Background Floating Cards */}
              <FloatingCard isLoaded={isLoaded} delay={600} className="w-48 h-32 sm:w-64 sm:h-40" style={{ top: '10%', left: '15%', transform: 'translateZ(-200px) rotateY(20deg)' }}>
                <p className="text-xs text-gray-400">Activity</p>
                <div className="mt-2 space-y-1">
                  <div className="h-2 w-full bg-gray-600/50 rounded-full"></div>
                  <div className="h-2 w-3/4 bg-gray-600/50 rounded-full"></div>
                  <div className="h-2 w-5/6 bg-gray-600/50 rounded-full"></div>
                </div>
              </FloatingCard>
              <FloatingCard isLoaded={isLoaded} delay={700} className="w-40 h-24 sm:w-56" style={{ top: '20%', right: '10%', transform: 'translateZ(-150px) rotateY(-15deg)' }}>
                <p className="text-xs text-gray-400">My Workspace</p>
                <div className="mt-2 space-y-1">
                  <div className="h-2 w-full bg-blue-500/50 rounded-full"></div>
                  <div className="h-2 w-3/4 bg-gray-600/50 rounded-full"></div>
                </div>
              </FloatingCard>
              <FloatingCard isLoaded={isLoaded} delay={800} className="w-56 h-40 sm:w-72 sm:h-48" style={{ bottom: '15%', left: '20%', transform: 'translateZ(-100px) rotateY(10deg)' }}>
                <p className="text-xs text-gray-400">Productivity Reports</p>
                <div className="w-full h-24 bg-gradient-to-t from-purple-500/20 to-transparent mt-2 rounded-md"></div>
              </FloatingCard>
              <FloatingCard isLoaded={isLoaded} delay={900} className="w-32 h-40 sm:w-40 sm:h-48" style={{ bottom: '25%', right: '18%', transform: 'translateZ(-250px) rotateY(-25deg)' }}>
                <p className="text-xs text-gray-400">Appointment Booking</p>
                <div className="w-full h-24 grid grid-cols-3 gap-1 p-1 mt-2">
                  {Array.from({ length: 9 }).map((_, i) => <div key={i} className="bg-gray-600/40 rounded-sm"></div>)}
                </div>
              </FloatingCard>

              {/* Central Content */}
              <div className="relative z-10 flex flex-col items-center text-center p-4" style={{ transform: 'translateZ(50px)' }}>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm text-xs sm:text-sm font-medium transition-all duration-700 ease-out delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  <span>Digital Business Card Maker</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </div>
                <h2 className={`mt-4 text-5xl sm:text-7xl font-bold text-white transition-all duration-700 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{textShadow: '0 0 20px rgba(255,255,255,0.5)'}}>
                  Create your Digital Business Card
                </h2>
                <p className={`mt-4 max-w-xl text-md sm:text-lg text-gray-300 transition-all duration-700 ease-out delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  Tapion's Card is a Digital Business Card Maker. You can create your own digital vcard to attract your customers.
                </p>
                <a href="#" className={`mt-8 px-8 py-3 text-md sm:text-lg font-semibold text-black bg-white rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-700 ease-out delay-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  Create Your Card — ₹149/month
                </a>
                <p className={`mt-2 text-xs text-gray-500 transition-all duration-700 ease-out delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  Billed monthly (inclusive of GST)
                </p>
              </div>
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center">
            <p className={`text-sm text-gray-400 transition-all duration-700 ease-out delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              Trusted by 10,000+ businesses using Tapion's digital business cards.
            </p>
            {/* Logo Marquee */}
            <div 
              className={`mt-6 w-full max-w-2xl relative overflow-hidden transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '800ms', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'}}
            >
              <div className="flex animate-marquee-logos">
                {[...companyLogos, ...companyLogos].map((logo, index) => (
                  <div key={index} className="mx-8 flex-shrink-0 flex items-center justify-center h-8">
                    <span className="text-xl font-medium tracking-wide text-gray-500">{logo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Theme Section */}
        <section className=" container relative py-12 sm:py-16 overflow-hidden">
          <div className="relative z-10 text-center mb-16 px-4">
              <h2 className="text-4xl sm:text-6xl font-bold text-white" style={{textShadow: '0 0 20px rgba(255,255,255,0.5)'}}>
                Choose a Theme That Defines Your Brand
              </h2>
          </div>

          <div className="relative h-[650px] w-full flex items-center justify-center">
             {/* Phone Mockup Image - positioned on top */}
            <img
              src="https://groarz.com/wp-content/uploads/2025/07/apple-iphone-16-plus-2024-medium.png"
              alt="Phone Frame"
              className={`absolute z-10 w-[295px] h-[600px] pointer-events-none transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '300ms' }}
            />

            {/* Swiper Container */}
            <div className={`swiper-container w-full h-[570px] transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
              <div className="swiper-wrapper items-center">
                {themeImages.map((src, index) => (
                  <div key={index} className="swiper-slide">
                    <img src={src} alt={`Theme ${index + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <p className={`text-lg text-gray-400 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '100ms' }}>Templates</p>
            <h2 className={`mt-2 text-4xl sm:text-6xl font-bold text-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{textShadow: '0 0 20px rgba(255,255,255,0.5)', transitionDelay: '200ms'}}>
              Digital Business Card Templates
            </h2>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {digitalCardTemplates.map((template, index) => (
                <button 
                  key={template}
                  className={`bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  {template}
                </button>
              ))}
            </div>

            <h2 className={`mt-24 text-4xl sm:text-6xl font-bold text-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{textShadow: '0 0 20px rgba(255,255,255,0.5)', transitionDelay: '900ms'}}>
              Whatsapp Store Templates
            </h2>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {whatsappStoreTemplates.map((template, index) => (
                <button 
                  key={template}
                  className={`bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${1000 + index * 50}ms` }}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className={`text-4xl sm:text-5xl font-bold transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1200ms', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
              How it Works
            </h2>
            <p className={`mt-4 max-w-2xl mx-auto text-md sm:text-lg text-gray-300 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1300ms' }}>
              Get up and running with Tapion in no time.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl mx-auto">
              {howItWorksSteps.map((step, index) => (
                <div key={step.title} className={`text-left transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${1400 + index * 150}ms` }}>
                  <div className="w-16 h-16 bg-white/10 border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/30">
                    <span className="text-white">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>

            <div className={`mt-16 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '2000ms' }}>
              <button className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors shadow-lg">
                Book a Demo
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div 
                className={`bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '2200ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${2300 + index * 100}ms` }}
                  >
                    <h3 className="text-4xl sm:text-5xl font-bold text-white">{stat.value}</h3>
                    <p className="mt-2 text-md text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <p className={`text-lg text-gray-400 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '2800ms' }}>Pricing</p>
            <h2 className={`mt-2 text-4xl sm:text-6xl font-bold text-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{textShadow: '0 0 20px rgba(255,255,255,0.5)', transitionDelay: '2900ms'}}>
              Affordable Pricing Plans
            </h2>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={plan.title}
                  className={`bg-white/5 border border-white/10 rounded-2xl p-8 text-left transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${3000 + index * 150}ms` }}
                >
                  <h3 className="text-2xl font-semibold text-white">{plan.title}</h3>
                  <p className="mt-2 text-4xl font-bold text-white">{plan.price} <span className="text-lg font-normal text-gray-400">/ Month (Billed monthly)</span></p>
                  <p className="mt-4 text-sm text-gray-400 h-16">{plan.description}</p>
                  <button className="mt-6 w-full bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-colors">Get Started</button>
                  
                  <div className="mt-8 space-y-6">
                    {plan.features.map((featureSet) => (
                      <div key={featureSet.name}>
                        <h4 className="font-semibold text-white mb-4">{featureSet.name}</h4>
                        <ul className="space-y-3">
                          {featureSet.items.map((item) => (
                             <li key={item.text} className="flex items-center text-sm text-gray-300">
                              {item.included ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                              )}
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {setupFees.map((fee, index) => (
                <div 
                  key={fee.title}
                  className={`bg-white/5 border border-white/10 rounded-2xl p-8 text-left transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${3500 + index * 100}ms` }}
                >
                    <h3 className="text-xl font-semibold text-white">{fee.title}</h3>
                    <p className="mt-2 text-3xl font-bold text-white">{fee.price} <span className="text-base font-normal text-gray-400">/ Only</span></p>
                    <p className="mt-4 text-sm text-gray-400">{fee.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
             <div className={`relative inline-block mb-4 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '3900ms' }}>
               <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-full shadow-2xl shadow-black/50 flex items-center justify-center">
                 <div className="w-full h-full rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
               </div>
            </div>
            <p className={`text-lg text-gray-400 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '4000ms' }}>Testimonials</p>
            <h2 className={`mt-2 text-4xl sm:text-6xl font-bold text-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{textShadow: '0 0 20px rgba(255,255,255,0.5)', transitionDelay: '4100ms'}}>
              What Our Users Say
            </h2>
            <div className={`mt-16 relative w-full overflow-hidden transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '4200ms', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'}}>
              <div className="flex animate-marquee">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <TestimonialCard 
                    key={index}
                    quote={testimonial.quote}
                    name={testimonial.name}
                    role={testimonial.role}
                    avatarUrl={testimonial.avatarUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <p className={`text-lg text-gray-400 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '4400ms' }}>FAQ's</p>
            <h2 className={`mt-2 text-4xl sm:text-6xl font-bold text-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{textShadow: '0 0 20px rgba(255,255,255,0.5)', transitionDelay: '4500ms'}}>
              Frequently Asked Questions
            </h2>

            <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaqIndex === index}
                  onClick={() => handleFaqClick(index)}
                  isLoaded={isLoaded}
                  delay={4600 + index * 50}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 
              className={`text-4xl sm:text-6xl font-bold text-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{textShadow: '0 0 20px rgba(255,255,255,0.5)', transitionDelay: '5800ms'}}
            >
              Ready to Grow with Tapion's Card?
            </h2>
            <p 
              className={`mt-4 text-lg text-gray-300 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '5900ms' }}
            >
              Join 10,000+ businesses who have gone digital.
            </p>
            <a 
              href="#" 
              className={`mt-8 inline-block px-12 py-4 text-lg font-semibold text-black bg-white rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: '6000ms' }}
            >
              Create Your Card — ₹149/month
            </a>
            <div 
              className={`mt-6 flex flex-wrap justify-center gap-4 sm:gap-8 text-gray-400 text-sm transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '6100ms' }}
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Build your card in minutes.</span>
              </div>
              <div className="flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Share instantly on WhatsApp.</span>
              </div>
              <div className="flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Tap with NFC anywhere.</span>
              </div>
            </div>
             <p 
              className={`mt-16 text-sm text-gray-500 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '6200ms' }}
            >
              Still not convinced? No worries, I will see you in my retargeting ads. 😉
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
