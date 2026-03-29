import Header from "../components/Header";
import Footer from "../components/Footer";
import profileImage from "../assets/profile.jpeg";
import { motion } from "framer-motion";

function About() {
  return (
    <>
      <Header />

      <main className="bg-[#0b0b0f] text-white min-h-screen overflow-hidden relative">

        {/* Glow Background */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />

        <div className="relative z-10 px-6 md:px-12 pt-32 pb-24 max-w-5xl mx-auto space-y-20">

          {/* ================= HERO ================= */}
          <section className="text-center space-y-8">

            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-40 group-hover:opacity-70 transition duration-500"></div>

                <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white/10 shadow-xl">
                  <img
                    src={profileImage}
                    alt="Omkar Jadhav"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              I am Omkar Jadhav — a technology-driven creator blending development,
              design, and business strategy to build impactful digital solutions.
              My work focuses on developing intelligent SaaS platforms, crafting
              modern brand identities, and transforming innovative ideas into scalable systems.
            </p>
          </section>

           {/* ================= MY VISION PREMIUM CARD ================= */}
          <section className="flex justify-center">
            <div className="group max-w-4xl w-full">

              <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:shadow-[0_0_70px_rgba(168,85,247,0.7)]">

                <div className="bg-[#0b0b0f]/95 backdrop-blur-xl rounded-3xl px-12 py-14 text-center">

                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    My Vision
                  </h2>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    My long-term vision is to build intelligent digital ecosystems
                    that bridge technology, creativity, and business strategy.
                    I aim to contribute to meaningful innovation in SaaS,
                    healthcare technology, and smart automation systems.
                  </p>

                  <p className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    I don’t just build projects — I build systems, brands, and ideas designed for long-term impact.
                  </p>

                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTIONS ================= */}
          {[
            {
              title: "🚀 What Drives Me",
              content: `I build systems that are efficient, scalable, and meaningful.
              Every project I approach with structure, clarity, and long-term vision.`,
            },
            {
              title: "💻 My Technical Background",
              content: `I specialize in backend-driven SaaS systems, scalable architecture,
              and solving system-level challenges.`,
            },
            {
              title: "🎨 Creative & Design Side",
              content: `Founder of B3 Studio — building brand identity systems,
              UI/UX design, and digital experiences.`,
            },
            {
              title: "🌿 Brand & Entrepreneurial Journey",
              content: `Building Eira — focused on organic awareness and authentic lifestyle branding.`,
            },
          ].map((section, i) => (
            <section
              key={i}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 space-y-6 hover:border-purple-500/40 transition duration-300"
            >
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}


          {/* ================= ACHIEVEMENTS (STATIC PREMIUM) ================= */}
          <section className="space-y-12">

            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Achievements
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {[
                {
                  title: "Built Multiple MVP Products",
                  desc: "Developed and structured multiple SaaS MVPs from idea to execution."
                },
                {
                  title: "AI Automation System",
                  desc: "Created LinkedIn AI content automation system using n8n & OpenAI."
                },
                {
                  title: "Founded B3 Studio",
                  desc: "Launched branding & digital studio delivering premium design systems."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative p-[2px] rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition duration-500"
                >
                  <div className="bg-[#0b0b0f]/95 backdrop-blur-xl rounded-2xl p-8 h-full">
                    <h3 className="text-lg font-semibold mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;

