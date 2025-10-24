import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col gap-3">
        <p> © All Right - Kai Nguyen 2025</p>
        <div className="flex items-center gap-4 justify-center">
          <a href="#" className="hover:text-primary-200">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-primary-200">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="hover:text-primary-200">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-primary-200">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
