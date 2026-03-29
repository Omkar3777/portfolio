import { useEffect, useState } from "react";
import API from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import profileImage from "../assets/profile.jpeg";
import { motion } from "framer-motion";

function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [social, setSocial] = useState([]);
  const [homeSettings, setHomeSettings] = useState(null);
  const [tools, setTools] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const projectsRes = await API.get("/projects");
      setProjects(projectsRes.data);
    } catch (err) {
      console.error("Projects error:", err.message);
    }

    try {
      const skillsRes = await API.get("/skills");
      setSkills(skillsRes.data);
    } catch (err) {
      console.error("Skills error:", err.message);
    }

    try {
      const achievementsRes = await API.get("/achievements");
      setAchievements(achievementsRes.data);
    } catch (err) {
      console.error("Achievements error:", err.message);
    }

    try {
      const socialRes = await API.get("/social");
      setSocial(socialRes.data);
    } catch (err) {
      console.error("Social error:", err.message);
    }

    try {
      const toolsRes = await API.get("/tools");
      setTools(toolsRes.data);
    } catch (err) {
      console.error("Tools error:", err.message);
    }

    try {
      const homeRes = await API.get("/home/resume");
      setHomeSettings(homeRes.data);
    } catch (err) {
      console.error("Home resume error:", err.message);
    }
  };

  return (
    <>
      <Header />

      <motion.main
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="bg-[#0b0b0f] text-white min-h-screen overflow-hidden"
>
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />

        <div className="relative z-10 px-6 md:px-12 pt-32 pb-20 space-y-28 max-w-7xl mx-auto">

        {/* HERO */}
<section className="relative grid md:grid-cols-2 gap-16 items-center">

  {/* Ambient Background Glow */}
  <div className="
    absolute inset-0
    bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.12),transparent_40%),
    radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_40%)]
    pointer-events-none
  "></div>

  {/* ===== PROFILE IMAGE ===== */}
  <div className="flex justify-center md:order-2 order-1 relative">

    <div className="relative group w-60 h-60 md:w-96 md:h-96">

      {/* Soft Neon Glow */}
      <div className="
        absolute -inset-6
        rounded-full
        bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
        blur-3xl opacity-30
        group-hover:opacity-60
        transition duration-700
      "></div>

      {/* Neon Border */}
      <div className="
        relative p-[3px] rounded-full
        bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
        transition duration-500
        group-hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]
      ">

        <div className="rounded-full overflow-hidden bg-[#0b0b0f]">
          <img
            src={profileImage}
            alt="Profile"
            className="
              w-60 h-60 md:w-96 md:h-96
              object-cover object-[center_20%]
              transition duration-700 ease-out
              group-hover:scale-105
            "
          />
        </div>

      </div>

    </div>
  </div>

  {/* ===== HERO TEXT ===== */}
  <div className="space-y-8 md:order-1 order-2 text-center md:text-left relative z-10">

    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
      Omkar Jadhav
    </h1>

    <h2 className="text-lg text-gray-400 tracking-wide">
      Tech Developer • Graphic Designer • Brand Builder
    </h2>

    <p className="text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
      I design, develop, and build scalable digital systems
      that solve real-world problems.
    </p>

    {/* ===== BUTTONS ===== */}
    <div className="flex flex-wrap gap-6 pt-4 justify-center md:justify-start">

      {/* Primary Button */}
      <a
        href="/projects"
        className="
          px-7 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-cyan-500 to-purple-500
          text-black
          transition duration-500
          hover:scale-105
          hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]
        "
      >
        View My Work
      </a>

      {/* Outline Button */}
      <a
        href="/contact"
        className="
          px-7 py-3 rounded-xl
          border border-white/20
          text-white
          transition duration-500
          hover:border-cyan-400
          hover:text-cyan-400
          hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
        "
      >
        Contact Me
      </a>

      {/* Resume Button */}
      {homeSettings && homeSettings.resume && (
        <a
          href={`http://localhost:5000/uploads/${homeSettings.resume}`}
          target="_blank"
          rel="noreferrer"
          className="
            px-7 py-3 rounded-xl
            bg-white/10
            border border-white/10
            transition duration-500
            hover:bg-white/20
            hover:scale-105
          "
        >
          Download Resume
        </a>
      )}

    </div>

  </div>

</section>

          {/* SOCIAL */}
          <section>
            <h2 className="text-3xl font-bold mb-10">Latest Updates</h2>
            <div className="flex flex-wrap gap-6">
              {social.map((item) => (
                <a
                  key={item._id}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-cyan-500/10 border border-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-500/20"
                >
                  {item.platform}
                </a>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <motion.section
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
            <h2 className="text-3xl font-bold mb-10">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
  <div key={skill._id} className="group">

    {/* Gradient Border */}
    <div
      className="
        relative p-[2px] rounded-full
        bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
        transition-all duration-300
        group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
        group-hover:-translate-y-1
      "
    >
      
      {/* Inner Glass Card */}
      <div
        className="
          bg-[#0b0b0f]/90 backdrop-blur-xl
          rounded-full px-6 py-3
          transition-all duration-300
          group-hover:bg-[#0b0b0f]
        "
      >
        <span className="text-white font-medium">
          {skill.name} — {skill.level}
        </span>
      </div>

    </div>
  </div>
))}
            </div>
          </motion.section>

{/* ================= TOOLS ================= */}
<section>
  <h2 className="text-3xl font-bold mb-12">Tools I Use</h2>

  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-10">

  {tools && tools.length > 0 ? (
  tools.map((tool) => (
    <div key={tool._id} className="flex justify-center">

      <div
        className="
          inline-flex items-center justify-center
          transition-all duration-300 ease-out
          hover:-translate-y-2
        "
      >
        {tool.icon ? (
          <img
            src={`http://localhost:5000/uploads/${tool.icon}`}
            alt={tool.name}
            className="
              w-40 h-20 object-contain
              transition duration-300 ease-out
              hover:scale-110
              hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]
            "
          />
        ) : (
          <span
            className="
              text-sm text-gray-300 text-center
              transition duration-300
              hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]
            "
          >
            {tool.name}
          </span>
        )}
      </div>

    </div>
  ))
) : (
  <p className="text-gray-500">No tools added yet.</p>
)}
  </div>
</section>

         {/* ACHIEVEMENTS */}
<section className="space-y-12">

  <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
    Achievements
  </h2>

  <div className="grid md:grid-cols-2 gap-8">
    {achievements.map((item) => (
      <div
        key={item._id}
        className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
      >

        {/* Soft Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

        {/* Shine Sweep Effect */}
        <div className="absolute -left-full top-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-1000"></div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          <h3 className="font-bold text-lg">
            {item.title}
          </h3>

          <p className="text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </div>

      </div>
    ))}
  </div>

</section>

{/* PROJECTS */}
<section>
  <h2 className="text-3xl font-bold mb-10">
    Featured Projects
  </h2>

  <div className="grid md:grid-cols-3 gap-8 items-stretch">
    {projects
      ?.filter(
        (p) =>
          p.type &&
          p.type.toLowerCase().trim() === "development"
      )
      .slice(0, 3)
      .map((project) => (
        <div key={project._id} className="group h-full">

          <div
            className="
              relative p-[2px] rounded-2xl h-full
              bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
              transition-all duration-300
              group-hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]
              group-hover:-translate-y-2
            "
          >

            <div
              className="
                bg-[#0b0b0f]/90 backdrop-blur-xl
                rounded-2xl p-6 h-full
                flex flex-col
                transition-all duration-300
                group-hover:bg-[#0b0b0f]
              "
            >
              <h3 className="text-xl font-bold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-400 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="mt-6">
                <span className="text-cyan-400 group-hover:text-purple-400 transition">
                  View Project →
                </span>
              </div>

            </div>
          </div>

        </div>
      ))}
  </div>
</section>

          {/* CTA */}
          <section className="pt-20">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Let’s Build Something Amazing Together
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Have a project idea or collaboration in mind? Let’s connect and create impactful digital experiences.
              </p>
              <a
                href="/contact"
                className="inline-block bg-cyan-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition"
              >
                Get In Touch
              </a>
            </div>
          </section>

        </div>
      </motion.main>

      <Footer />
    </>
  );
}

export default Home;