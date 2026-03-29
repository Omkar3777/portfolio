import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-black text-white px-6 md:px-12 pt-20 pb-10 border-t border-white/10">

      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Omkar.info
            </h3>

            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              Tech-driven creative founder building scalable digital systems,
              SaaS platforms, and modern brand experiences.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 pt-2 text-gray-400 text-sm">
              <a href="https://www.linkedin.com/in/omkarjadhav3777?utm_source=share_via&utm_content=profile&utm_medium=member_ios" className="hover:text-cyan-400 transition">LinkedIn</a>
              <a href="https://github.com/Omkar3777" className="hover:text-cyan-400 transition">GitHub</a>
              <a href="https://youtube.com/@omkarjadhav-3777?si=rwgVWGu68fVDMsK7" className="hover:text-cyan-400 transition">YouTube</a>
              <a href="https://www.instagram.com/omkarjadhav.in?igsh=MWJsMWRoemRlZmJpYg%3D%3D&utm_source=qr" className="hover:text-cyan-400 transition">Instagram</a>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 gap-8">

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
                <li><Link to="/projects" className="hover:text-cyan-400 transition">Projects</Link></li>
                <li><Link to="/about" className="hover:text-cyan-400 transition">About</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Full Stack Development</li>
                <li>UI/UX Design</li>
                <li>Brand Strategy</li>
                <li>SaaS Architecture</li>
              </ul>
            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">

          <p>© {new Date().getFullYear()} Omkar Jadhav. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="#" className="hover:text-cyan-400 transition">Privacy Policy</Link>
            <Link to="#" className="hover:text-cyan-400 transition">Terms</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;