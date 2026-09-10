import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import logo from '../../assets/logo/logo.png'

function Footer() {
  return (
    <footer className=" md:w-screen w-[460px] bg-gradient-to-r from-green-700 via-green-800 to-teal-900 text-white py-12 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo + Description */}
        <div className="md:col-span-2 text-center md:text-left ">

          <div className="flex md:mb-4 ">
           <img src={logo} alt="" className="h-20 w-20 "/>
          <h2 className="text-2xl font-bold  mt-5 ">KisanMitra</h2>

          </div>
          
          <p className="text-sm leading-relaxed">
            Empowering Indian farmers with AI-based crop advisory, weather updates, and digital market insights to maximize yield and income.
          </p>
          <p className="mt-4 text-sm">📞 +91 98765 43210</p>
          <p className="mt-1 text-sm">✉️ support@aifarmer.com</p>
        </div>

        {/* Services */}
        <div className="text-center md:text-left">
          <h3 className="font-bold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/ai-chatbot"
                className="hover:text-green-300 hover:underline transition duration-300"
              >
                AI Crop Advisory
              </a>
            </li>
            <li>
              <a
                href="/weather"
                className="hover:text-green-300 hover:underline transition duration-300"
              >
                Weather Forecasting
              </a>
            </li>
            <li>
              <a
                href="/soil-detection"
                className="hover:text-green-300 hover:underline transition duration-300"
              >
                Soil Health Analysis
              </a>
            </li>
            <li>
              <a
                href="/market-price"
                className="hover:text-green-300 hover:underline transition duration-300"
              >
                Market Price Insights
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-green-300 hover:underline transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/contatct" className="hover:text-green-300 hover:underline transition duration-300">
                Contact & Support
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-300 hover:underline transition duration-300">
                Team & Careers
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-green-300 hover:underline transition duration-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Bottom */}
        <div className="flex flex-col items-center justify-center md:items-start md:mb-40 md:justify-end space-y-2">
          <p>© 2025 AI with Farmer. All rights reserved.</p>
          <div className="flex space-x-4 mt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full bg-green-800 hover:bg-green-600 transition transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-full bg-green-800 hover:bg-green-600 transition transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="p-2 rounded-full bg-green-800 hover:bg-green-600 transition transform hover:scale-110"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full bg-green-800 hover:bg-green-600 transition transform hover:scale-110"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
