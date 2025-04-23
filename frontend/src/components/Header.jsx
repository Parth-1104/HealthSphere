import React, { useState, useEffect, useRef } from 'react';
import { Bitcoin, Car, Video, UserRound, Plane, Building2, Stethoscope, Shield, Globe, ArrowRight, Check, ChevronRight, Heart, Phone, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [floatingPosition, setFloatingPosition] = useState(0);
  const floatingElementRef = useRef(null);
  const targetSectionRef = useRef(null);
  const mobileFrameRef = useRef(null);
  const frameAttachmentRef = useRef(null);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      
      setScrolled(scrollPosition > 50);
      setScrollProgress(progress);
      
      // Calculate floating position for the consultation card
      if (floatingElementRef.current && targetSectionRef.current) {
        const startPosition = 300;
        const targetPosition = targetSectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
        
        if (scrollPosition < startPosition) {
          setFloatingPosition(0);
        } else if (scrollPosition >= startPosition && scrollPosition <= targetPosition) {
          const progress = (scrollPosition - startPosition) / (targetPosition - startPosition);
          const floatAmount = 100 * progress;
          setFloatingPosition(floatAmount);
        } else {
          setFloatingPosition(100);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { icon: <Car />, label: "Transport" },
    { icon: <Building2 />, label: "Facilities" },
    { icon: <UserRound />, label: "Support" },
    { icon: <Bitcoin />, label: "Payments" }
  ];

  const tabContent = [
    {
      title: "Smart Transportation Network",
      description: "Door-to-door service with professional drivers, medical vehicles, and real-time tracking. Priority lanes for medical emergencies and custom accessibility options.",
      image: "/api/placeholder/600/400",
      stats: [
        { value: "24/7", label: "Service" },
        { value: "5min", label: "Response" },
        { value: "100%", label: "Sanitized" }
      ]
    },
    {
      title: "World-Class Medical Facilities",
      description: "Access to a global network of JCI-accredited hospitals, specialized clinics, and recovery centers equipped with cutting-edge technology and staffed by leading specialists.",
      image: "/api/placeholder/600/400",
      stats: [
        { value: "500+", label: "Hospitals" },
        { value: "50+", label: "Countries" },
        { value: "A+++", label: "Rated" }
      ]
    },
    {
      title: "Personalized Care Concierge",
      description: "Dedicated medical coordinators handle everything from appointment scheduling to translation services, dietary requirements, and cultural considerations.",
      image: "/api/placeholder/600/400",
      stats: [
        { value: "24/7", label: "Support" },
        { value: "15+", label: "Languages" },
        { value: "100%", label: "Customized" }
      ]
    },
    {
      title: "Transparent Financial Solutions",
      description: "Clear pricing with no hidden fees, flexible payment options including cryptocurrency, and assistance with insurance claims and reimbursement procedures.",
      image: "/api/placeholder/600/400",
      stats: [
        { value: "100%", label: "Transparent" },
        { value: "12+", label: "Currencies" },
        { value: "Secure", label: "Blockchain" }
      ]
    }
  ];

  return (
    <div className="min-h-screen mt-32 bg-gradient-to-b from-indigo-50 to-white">
      {/* Floating Mobile Frame - Modified with top padding when in landscape and attachment point */}
      <div 
        ref={mobileFrameRef}
        className="fixed z-40 transition-all duration-700 ease-in-out"
        style={{
          top: scrollProgress < 0.2 ? '25%' : '25%', // Added more top padding when in landscape
          right: scrollProgress < 0.2 ? '50%' : '10%',
          transform: `translate(${scrollProgress < 0.2 ? '50%' : '0'}, -50%) 
                     scale(${0.7 + scrollProgress * 0.2}) 
                     rotate(${scrollProgress < 0.2 ? '0deg' : '90deg'})`,
          width: '280px',
          height: scrollProgress < 0.2 ? '160px' : '560px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          background: 'white',
          border: '12px solid #1e293b',
          overflow: 'hidden',
          // Make it disappear sooner (at 60% scroll instead of 90%)
          opacity: scrollProgress > 0.6 ? 0 : 1,
          // Make it non-interactive when it starts to disappear
          pointerEvents: scrollProgress > 0.55 ? 'none' : 'auto',
          // Add right position adjustment to move it more to the side
          right: scrollProgress < 0.2 ? '50%' : (scrollProgress < 0.4 ? '5%' : '2%'),
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center justify-center z-10">
          <div className="w-16 h-2 bg-gray-600 rounded-full"></div>
        </div>
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-violet-800 overflow-auto p-4">
          <div className="h-full flex flex-col justify-center items-center text-white">
            <Stethoscope className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">MedJourney App</h3>
            <p className="text-sm opacity-80 text-center">Connect with world-class healthcare providers globally</p>
            
            <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
              {/* Dynamic content based on scroll position */}
              {scrollProgress > 0.3 && (
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span className="text-sm">500+ Partner Hospitals</span>
                  </div>
                </div>
              )}
              
              {scrollProgress > 0.4 && (
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <UserRound className="w-5 h-5" />
                    <span className="text-sm">24/7 Personal Concierge</span>
                  </div>
                </div>
              )}
              
              {scrollProgress > 0.5 && scrollProgress < 0.6 && (
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-5 h-5" />
                    <span className="text-sm">Flexible Payment Options</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section with 3D-like effect */}
      <div className="relative bg-gradient-to-br from-indigo-900 to-violet-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-indigo-800 opacity-50"></div>
          <div className="absolute inset-0 bg-cover bg-center" style={{ 
            backgroundImage: "url('/api/placeholder/1200/800')",
            filter: "blur(3px)"
          }}></div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 18}%`,
                  animation: `float ${5 + i}s ease-in-out infinite alternate`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-32 lg:py-48 relative z-10">
          <div className="flex flex-col items-center justify-between gap-12">
            <div className="md:w-1/2 text-white text-center">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Medical Excellence <br />Without Borders
              </h1>
              <p className="text-xl bg-indigo-800/70 p-4 rounded-lg mb-12 leading-relaxed max-w-lg mx-auto">
                A seamless healthcare journey connecting you to world-class medical care with personalized assistance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    document.getElementById('speciality')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-white text-indigo-900 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  Find Specialists <ChevronRight className="w-5 h-5" />
                </button>

                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Contact Floating Buttons */}
      <div className="fixed left-6 top-1/3 flex flex-col gap-3 z-50">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
          <Phone className="w-6 h-6" />
        </button>
        <button className="bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
          <Heart className="w-6 h-6" />
        </button>
      </div>

      {/* Frame Attachment Point - Empty space where the floating frame will dock */}
      <div 
        ref={frameAttachmentRef} 
        className="container mx-auto px-4 py-16 my-16"
        style={{
          display: scrollProgress > 0.4 && scrollProgress < 0.6 ? 'block' : 'none',
          height: '600px'
        }}
      >
        <div className="bg-indigo-50 rounded-3xl p-8 h-full flex items-center justify-center shadow-inner">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Mobile Experience</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Our mobile app provides the same comprehensive features with an intuitive interface for on-the-go access.
            </p>
            <div 
              className="h-96 w-72 mx-auto mt-8 rounded-3xl border-4 border-dashed border-indigo-300 flex items-center justify-center"
              style={{
                opacity: scrollProgress > 0.55 ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              <p className="text-indigo-400 font-medium">Mobile App View</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive Features Section */}
      <div ref={targetSectionRef} className="container mx-auto px-4 py-32" id="speciality">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Your Complete Medical Journey Solution
          </h2>
          <p className="text-xl text-gray-600">
            Every aspect of your healthcare experience reimagined for simplicity, quality, and peace of mind.
          </p>
        </div>
        
        {/* Interactive Tabs */}
        <div className="max-w-5xl mx-auto items-center">
          <div className="flex justify-center items-center overflow-x-auto space-x-1 md:space-x-4 mb-12 pb-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col items-center min-w-28 md:min-w-36 px-6 py-4 rounded-lg transition-all ${
                  activeTab === index 
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className={`${activeTab === index ? 'text-white' : 'text-indigo-600'}`}>
                  {tab.icon}
                </div>
                <span className="mt-2 font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-indigo-100">
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="md:w-1/2">
                <img 
                  src={tabContent[activeTab].image} 
                  alt={tabContent[activeTab].title} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: '300px' }}
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-gray-600 mb-8">
                    {tabContent[activeTab].description}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {tabContent[activeTab].stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className="bg-indigo-50 p-4 rounded-lg shadow text-center hover:shadow-md transition-all"
                    >
                      <div className="text-xl font-bold text-indigo-600">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Consultation Request Card (moved from floating to a fixed section) */}
      <div className="container mx-auto px-4 py-16 bg-indigo-50 rounded-3xl my-16 shadow-inner max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div 
              ref={floatingElementRef}
              className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 relative z-10"
            >
              <div className="flex gap-4 mb-6 items-center">
                <div className="bg-indigo-100 rounded-full p-3">
                  <Stethoscope className="w-8 h-8 text-indigo-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Schedule a Consultation</h3>
                  <p className="text-gray-600">Free initial assessment of your needs</p>
                </div>
              </div>
              
              <hr className="my-6 border-gray-200" />
              
              <div className="space-y-4">
                {["Personalized medical recommendations", "Cost estimates and payment options", "Complete travel & accommodation plan"].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 px-6 py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Calendar className="w-5 h-5" />
                Request Your Plan
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Health Journey Starts Here</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our medical concierge team specializes in creating personalized healthcare journeys that prioritize your needs, preferences, and comfort while connecting you with world-class specialists.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Expert Matching", desc: "Find the perfect specialist for your needs" },
                { title: "Travel Planning", desc: "Seamless logistics from door to door" },
                { title: "Language Support", desc: "Clear communication in your preferred language" },
                { title: "24/7 Assistance", desc: "Support throughout your medical journey" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-indigo-700">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Call-to-Action Card */}
      <div 
        className={`fixed bottom-20 right-6 bg-white rounded-lg shadow-2xl p-4 transition-all duration-500 z-40 max-w-xs ${
          scrolled && scrollProgress < 0.9 ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Schedule your consultation</p>
            <p className="text-xs text-gray-500 mb-2">Our specialists are ready to help</p>
            <button
      className="text-xs bg-indigo-600 text-white px-3 py-1 rounded font-medium hover:bg-indigo-700 transition-colors"
      onClick={() => navigate('/doctors')}
    >
      Book Now
    </button>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      </div>
      
      {/* Sticky Action Bar that appears when scrolling */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-3 px-4 transition-transform duration-300 z-50 ${
        scrolled ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Ready to start your medical journey?</p>
              <p className="text-sm text-gray-600">50+ countries, 500+ hospitals, 1000+ specialists</p>
            </div>
          </div>
          <button
      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap mt-3 sm:mt-0 shadow-md"
      onClick={() => navigate('/login')}
    >
      Get Started Now
    </button>
        </div>
      </div>
      
      {/* Add some animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;