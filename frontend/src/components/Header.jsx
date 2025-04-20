import React, { useState, useEffect } from 'react';
import { Bitcoin, Car, Video, UserRound, Plane, Building2, Stethoscope, Shield, Globe, ArrowRight, Check, ChevronRight } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { value: "24/7", label: "Service" },
        { value: "5min", label: "Response" },
        { value: "100%", label: "Sanitized" }
      ]
    },
    {
      title: "World-Class Medical Facilities",
      description: "Access to a global network of JCI-accredited hospitals, specialized clinics, and recovery centers equipped with cutting-edge technology and staffed by leading specialists.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { value: "500+", label: "Hospitals" },
        { value: "50+", label: "Countries" },
        { value: "A+++", label: "Rated" }
      ]
    },
    {
      title: "Personalized Care Concierge",
      description: "Dedicated medical coordinators handle everything from appointment scheduling to translation services, dietary requirements, and cultural considerations.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { value: "24/7", label: "Support" },
        { value: "15+", label: "Languages" },
        { value: "100%", label: "Customized" }
      ]
    },
    {
      title: "Transparent Financial Solutions",
      description: "Clear pricing with no hidden fees, flexible payment options including cryptocurrency, and assistance with insurance claims and reimbursement procedures.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { value: "100%", label: "Transparent" },
        { value: "12+", label: "Currencies" },
        { value: "Secure", label: "Blockchain" }
      ]
    }
  ];

  return (
    <div className="min-h-screen mt-52 bg-white">
      {/* Hero Section with 3D-like effect */}
      <div className="relative bg-gradient-to-b from-teal-900 to-teal-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-teal-800 opacity-50"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(3px)"
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Medical Excellence <br />Without Borders
              </h1>
              <p className="text-xl text-teal-800 mb-12 leading-relaxed max-w-lg">
                A seamless healthcare journey connecting you to world-class medical care with personalized assistance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              <button
  onClick={() => {
    document.getElementById('speciality')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="px-8 py-4 bg-white text-teal-900 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors"
>
  Find Specialists <ChevronRight className="w-5 h-5" />
</button>

                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  How It Works
                </button>
              </div>
            </div>
            
            <div className="md:w-5/12">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex gap-4 mb-4 items-center">
                  <div className="bg-teal-100 rounded-full p-3">
                    <Stethoscope className="w-8 h-8 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Schedule a Consultation</h3>
                    <p className="text-gray-600">Free initial assessment of your needs</p>
                  </div>
                </div>
                
                <hr className="my-4 border-gray-200" />
                
                <div className="space-y-4">
                  {["Personalized medical recommendations", "Cost estimates and payment options", "Complete travel & accommodation plan"].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
                  Request Your Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive Features Section */}
      <div className="container mx-auto px-4 py-20">
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
          <div className="flex justify-center items-center overflow-x-auto scrollbar-hide space-x-1 md:space-x-4 mb-12 pb-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col items-center min-w-28 md:min-w-36 px-6 py-4 rounded-lg transition-all ${
                  activeTab === index 
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className={`${activeTab === index ? 'text-white' : 'text-teal-600'}`}>
                  {tab.icon}
                </div>
                <span className="mt-2 font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
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
                    <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                      <div className="text-xl font-bold text-teal-600">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Action Bar that appears when scrolling */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-3 px-4 transition-transform duration-300 z-50 ${
        scrolled ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <Globe className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Ready to start your medical journey?</p>
              <p className="text-sm text-gray-600">50+ countries, 500+ hospitals, 1000+ specialists</p>
            </div>
          </div>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors whitespace-nowrap mt-3 sm:mt-0">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}

// Note: You'll need to add a utility class '.scrollbar-hide' to hide scrollbars on the tab navigation
// For Tailwind, add this to your tailwind.config.js:
// variants: {
//   scrollbar: ['rounded']
// },
// plugins: [
//   require('tailwind-scrollbar-hide')
// ]

export default App;