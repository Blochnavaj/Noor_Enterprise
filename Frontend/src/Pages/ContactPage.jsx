 import React from "react";

function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SECTION - TEXT & INFO */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-green-700 leading-tight">
            Get in Touch with <span className="text-gray-900">Noor Enterprise</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have questions about our <span className="font-medium text-green-700">organic fruit and vegetable powders</span>?  
            We’d love to hear from you! Whether you're a customer, distributor, or a wellness brand,
            our team is always ready to assist.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>
              📍 <span className="font-medium">Address:</span>  
              27 Noor Street, Green Market, Ahmedabad, India
            </p>
            <p>
              📞 <span className="font-medium">Phone:</span>  
              +91 98765 43210
            </p>
            <p>
              ✉️ <span className="font-medium">Email:</span>  
              support@noorenterprise.com
            </p>
          </div>

          <div className="pt-4">
            <iframe
              title="Noor Enterprise Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.080845173063!2d72.57136297437094!3d23.021623716158615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f10b9b7eab%3A0xf7dca7b96b4a9c!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1714838432330!5m2!1sen!2sin"
              className="w-full h-64 rounded-2xl shadow-md border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* RIGHT SECTION - CONTACT FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-green-100">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Send us a Message</h3>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
