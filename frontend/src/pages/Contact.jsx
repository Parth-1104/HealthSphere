import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-6 mt-[99px] md:px-20 lg:px-40 py-16 bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">Get in Touch</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          We’re here to help you connect with the right people at Prescripto. Whether you’re looking for support, partnership, or careers — drop us a message.
        </p>
      </section>

      {/* Info Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
        
        {/* Our Office */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">📍 Our Office</h2>
          <p className="text-gray-600">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">📞 Contact Us</h2>
          <p className="text-gray-600">
            Tel: (415) 555-0132 <br />
            Email: <a href="mailto:greatstackdev@gmail.com" className="underline hover:text-indigo-600">greatstackdev@gmail.com</a>
          </p>
        </div>

        {/* Careers */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">💼 Careers</h2>
          <p className="text-gray-600">
            We’re always looking for passionate innovators. Join our mission.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Explore Careers
          </button>
        </div>
      </section>

      {/* Visual + CTA */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <img
          src={assets.contact_image}
          alt="Contact Illustration"
          className="w-full lg:w-1/2 rounded-xl shadow-lg"
        />
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Let’s Build Something Great Together</h2>
          <p className="text-gray-600">
            Whether you have a question about features, trials, pricing, or anything else — our team is ready to help.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-indigo-700 transition-all">
            Contact Our Team
          </button>
        </div>
      </section>

    </div>
  );
};

export default Contact;
