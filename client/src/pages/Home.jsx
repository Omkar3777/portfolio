import { useEffect, useState } from "react";
import API from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import profileImage from "../assets/profile.jpeg";
import { motion } from "framer-motion";

// ✅ BASE URL (IMPORTANT)
const BASE_URL = "https://portfolio-zwya.onrender.com";

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
        <div className="relative z-10 px-6 md:px-12 pt-32 pb-20 space-y-28 max-w-7xl mx-auto">

          {/* HERO */}
          <section className="grid md:grid-cols-2 gap-16 items-center">

            {/* IMAGE */}
            <div className="flex justify-center md:order-2 order-1">
              <img
                src={profileImage}
                alt="Profile"
                className="w-60 h-60 md:w-96 md:h-96 rounded-full object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="space-y-8 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-cyan-400">
                Omkar Jadhav
              </h1>

              <p className="text-gray-400">
                Tech Developer • Graphic Designer • Brand Builder
              </p>

              <div className="flex gap-4 flex-wrap justify-center md:justify-start">

                <a href="/projects" className="bg-cyan-500 px-6 py-3 rounded">
                  View My Work
                </a>

                <a href="/contact" className="border px-6 py-3 rounded">
                  Contact Me
                </a>

                {/* ✅ FIXED RESUME */}
                {homeSettings?.resume && (
                  <a
                    href={`${BASE_URL}/uploads/${homeSettings.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/10 px-6 py-3 rounded"
                  >
                    Download Resume
                  </a>
                )}

              </div>
            </div>
          </section>

          {/* SOCIAL */}
          <section>
            <h2 className="text-2xl mb-6">Latest Updates</h2>
            <div className="flex gap-4 flex-wrap">
              {social.map((item) => (
                <a key={item._id} href={item.link} target="_blank">
                  {item.platform}
                </a>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section>
            <h2 className="text-2xl mb-6">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <div key={skill._id}>
                  {skill.name} - {skill.level}
                </div>
              ))}
            </div>
          </section>

          {/* ✅ TOOLS FIXED */}
          <section>
            <h2 className="text-2xl mb-6">Tools</h2>
            <div className="flex gap-6 flex-wrap">
              {tools.map((tool) => (
                <div key={tool._id}>
                  {tool.icon ? (
                    <img
                      src={`${BASE_URL}/uploads/${tool.icon}`}
                      alt={tool.name}
                      className="w-20"
                    />
                  ) : (
                    tool.name
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section>
            <h2 className="text-2xl mb-6">Achievements</h2>
            {achievements.map((a) => (
              <div key={a._id}>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
              </div>
            ))}
          </section>

          {/* PROJECTS */}
          <section>
            <h2 className="text-2xl mb-6">Projects</h2>
            {projects.map((p) => (
              <div key={p._id}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </section>

        </div>
      </motion.main>

      <Footer />
    </>
  );
}

export default Home;