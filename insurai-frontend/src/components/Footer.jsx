import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">InsurAI</h2>
          <p className="text-green-100 text-sm leading-relaxed">
            Empowering smarter insurance through automation and AI.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-green-100 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="#features" className="hover:text-white transition">Features</a></li>
            <li><a href="/login" className="hover:text-white transition">Login</a></li>
            <li><a href="/signup" className="hover:text-white transition">Signup</a></li>
          </ul>
        </div>

        {/* Column 3 - Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-green-200 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-200 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-200 transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-green-200 transition">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-green-800 text-green-100 text-sm py-3 text-center border-t border-green-700">
        © 2025 <span className="font-semibold text-white">InsurAI</span>. All rights reserved.
      </div>
    </footer>
  );
}
