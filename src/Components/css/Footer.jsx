import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#c7d7da] pt-16 mt-10 text-[#1f3d44]">
      <div className="max-w-7xl mx-auto px-6 grid gap-12 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand */}
        <div className="space-y-4">
          <img
            src="https://res.cloudinary.com/dycxc9esi/image/upload/v1769323430/bharaghor_02_acy9yn.png"
            alt="BharaGhor Logo"
            className="w-36"
          />
          <p className="text-sm text-[#355f66] leading-relaxed">
            Find your perfect home with comfort, trust, and ease.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 pt-2">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <span
                key={i}
                className="p-2 rounded-full bg-white shadow-sm hover:bg-[#073032] hover:text-white transition cursor-pointer"
              >
                <Icon size={14} />
              </span>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <h3 className="footer-heading-light">Quick Access</h3>
          <ul className="footer-links-light">
            {["Home", "About Us", "Services", "Blog"].map((item) => (
              <li key={item}>
                <a href="/" className="footer-link-light">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="footer-heading-light">Resources</h3>
          <ul className="footer-links-light">
            {["FAQ", "Support", "Terms of Service", "Privacy Policy"].map(
              (item) => (
                <li key={item}>
                  <a href="/" className="footer-link-light">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-heading-light">Contact Us</h3>
          <p className="footer-text-light">
            Block A, Road 3, House 127 <br />
            Mirpur 12, Dhaka-1216
          </p>
          <p className="footer-text-light mt-2">info@yessghor.com</p>
          <p className="footer-text-light">+880 1234 567890</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 border-t border-black/10 py-5 text-center text-sm text-[#355f66]">
        © 2026{" "}
        <span className="text-[#073032] font-semibold">
          BharaGhor
        </span>{" "}
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
