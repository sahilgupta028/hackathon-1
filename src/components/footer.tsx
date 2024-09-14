import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-4xl font-bold mb-4">About Us</h3>
            <p className="text-gray-200 leading-relaxed">
              "Health is the greatest gift." - Buddha. <br />
              We at Healthcare Inc. believe in empowering individuals with the care they deserve. Our dedicated team ensures every patient gets personalized treatment, combining the best in medical care with compassion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-4xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-200">
              <li>
                <a href="/" className="hover:text-gray-100 transition-all duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-100 transition-all duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-gray-100 transition-all duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-100 transition-all duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-100 transition-all duration-200">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-4xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-200">
              <li>📍 123 Healthcare Blvd, City, State</li>
              <li>📞 +1 (123) 456-7890</li>
              <li>✉️ support@healthcare.com</li>
              <div className="flex space-x-5 mt-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-200 hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7" viewBox="0 0 24 24">
                    <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.991 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.469h3.047v-2.644c0-3.019 1.791-4.688 4.533-4.688 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.492 0-1.953.928-1.953 1.876v2.268h3.328l-.532 3.469h-2.796v8.385c5.737-.9 10.125-5.863 10.125-11.854z" />
                  </svg>
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-200 hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.896-.956-2.173-1.555-3.591-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .386.043.762.127 1.124-4.087-.205-7.713-2.165-10.141-5.144-.424.725-.666 1.561-.666 2.457 0 1.694.863 3.188 2.175 4.065-.802-.026-1.557-.246-2.214-.615v.062c0 2.367 1.683 4.342 3.918 4.79-.41.111-.844.171-1.292.171-.315 0-.623-.03-.923-.087.625 1.951 2.444 3.374 4.6 3.414-1.68 1.318-3.808 2.103-6.115 2.103-.398 0-.79-.023-1.176-.068 2.179 1.396 4.768 2.21 7.548 2.21 9.054 0 14.001-7.496 14.001-13.986 0-.213-.005-.425-.014-.637.961-.695 1.796-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-4xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-200 mb-6">"The good physician treats the disease; the great physician treats the patient who has the disease." - William Osler.</p>
            <form className="flex space-x-3">
              <input
                type="email"
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50 text-gray-700"
                placeholder="Enter your email"
              />
              <button className="bg-white text-blue-600 font-bold py-3 px-5 rounded-lg hover:bg-gray-200 transition-all duration-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-500 pt-6 text-center text-gray-200">
          <p>© 2024 Healthcare Inc. All rights reserved.</p>
          <p className="mt-3">
            <a href="/terms" className="hover:text-white transition-all duration-200">
              Terms of Service
            </a>{" "}
            |{" "}
            <a href="/privacy" className="hover:text-white transition-all duration-200 ml-2">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
