import React from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">HealthSphere</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Delivering exceptional healthcare solutions with a focus on innovation and patient wellbeing. Your trusted partner in the digital health ecosystem.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4 uppercase tracking-wider">Company</h2>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Leadership</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">News</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Press Kit</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4 uppercase tracking-wider">Services</h2>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Telemedicine</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Health Analytics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Patient Portal</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Provider Solutions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">Enterprise Health</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4 uppercase tracking-wider">Contact</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={16} className="text-blue-700 mr-3" />
                <span className="text-gray-600">+1-212-456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="text-blue-700 mr-3" />
                <span className="text-gray-600">contact@healthsphere.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="text-blue-700 mr-3 mt-1" />
                <span className="text-gray-600">123 Business Avenue<br />Suite 500<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Stay informed</h3>
              <p className="text-gray-600">Subscribe to our newsletter for updates and insights</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-700 min-w-0 w-full md:w-64"
                />
                <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-r transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2024 HealthSphere. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-700 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-blue-700 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-blue-700 text-sm">HIPAA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer