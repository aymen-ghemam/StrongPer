const Footer = () => {
  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%)",
      }}
      className="text-white py-12 px-6 mt-auto"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">StrongPerformance</h3>
            <p className="text-gray-200 text-sm">
              Leading manufacturer of high-quality industrial and domestic water
              pumps.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="/" className="hover:text-cyan-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-cyan-300 transition">
                  Products
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-cyan-300 transition">
                  Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="#" className="hover:text-cyan-300 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-300 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-300 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-200 mb-2">
              Email: contact@peacebird.com
            </p>
            <p className="text-sm text-gray-200">Phone: +213 770 00 00 00</p>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
          <p>
            &copy; {new Date().getFullYear()} StrongPerformance. All rights
            reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-300 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-300 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
