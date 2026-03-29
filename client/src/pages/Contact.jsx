import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // 1️⃣ Send email to YOU
  emailjs
    .send(
      "service_j0u1wbf",
      "template_g78sqlc", // your main template
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "L9oS_M1h4qqA-fPV9"

    )
    .then(() => {
      console.log("Admin email sent");
    })
    .catch((error) => {
      console.error("Admin error:", error);
    });

  // 2️⃣ Send auto-reply to USER
  emailjs
    .send(
      "service_j0u1wbf",
      "template_jxdfi8n", // 👈 new template
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "L9oS_M1h4qqA-fPV9"
    )
    .then(() => {
      alert("Message sent successfully 🚀");
      setForm({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error("Auto reply error:", error);
      alert("Something went wrong ❌");
    });
};

  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-[#0b0b0f] text-white overflow-hidden">

        {/* Background Glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />

        <div className="relative z-10 px-6 md:px-12 py-28 max-w-7xl mx-auto space-y-24">

          {/* ================= HERO ================= */}
          <section className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Let’s Connect
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you’re looking to collaborate, hire, or discuss a new
              startup idea — I’m always open to meaningful conversations.
            </p>
          </section>

          {/* ================= CONTACT GRID ================= */}
          <section className="grid md:grid-cols-2 gap-12 items-stretch">

            {/* ================= CONTACT FORM ================= */}
            <div className="group relative p-[2px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition duration-500 h-full">

             <div className="bg-[#0b0b0f]/95 backdrop-blur-xl rounded-3xl p-10 space-y-8 h-full flex flex-col">

                <h2 className="text-2xl font-semibold mb-8">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition"
                  />

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition"
                  />

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition duration-300"
                  >
                    Send Message
                  </button>

                </form>
              </div>
            </div>

            {/* ================= DIRECT CONTACT ================= */}
            <div className="group relative p-[2px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition duration-500 h-full">
              <div className="bg-[#0b0b0f]/95 backdrop-blur-xl rounded-3xl p-10 space-y-8 h-full flex flex-col">

                <h2 className="text-2xl font-semibold">
                  Direct Contact
                </h2>

                <div className="space-y-6 text-gray-400">

                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p>omkar@example.com</p>
                  </div>

                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p>Bengaluru, India</p>
                  </div>

                  <div>
                    <p className="text-white font-medium">Available For</p>
                    <p>Freelance • Consulting • Startup Collaboration</p>
                  </div>

                </div>

                {/* SOCIAL */}
                <div className="flex gap-6 pt-6 text-sm">
                  <a href="https://www.linkedin.com/in/omkarjadhav3777?utm_source=share_via&utm_content=profile&utm_medium=member_ios" className="hover:text-cyan-400 transition">LinkedIn</a>
                  <a href="https://github.com/Omkar3777" className="hover:text-purple-400 transition">GitHub</a>
                  <a href="https://www.instagram.com/omkarjadhav.in?igsh=MWJsMWRoemRlZmJpYg%3D%3D&utm_source=qr" className="hover:text-pink-400 transition">Instagram</a>
                </div>

              </div>
            </div>

          </section>

          {/* ================= FINAL CTA ================= */}
          <section className="group relative p-[2px] rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition duration-500">

            <div className="bg-[#0b0b0f]/95 backdrop-blur-xl rounded-3xl p-16 text-center space-y-6">

              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Have a Project in Mind?
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto">
                Let’s turn your ideas into scalable digital solutions with
                smart design and powerful engineering.
              </p>

              <a
                href="/projects"
                className="inline-block mt-4 px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition duration-300"
              >
                View My Work
              </a>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Contact;