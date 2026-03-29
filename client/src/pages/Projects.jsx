import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../api";
import Tilt from "react-parallax-tilt";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const devProjects = projects.filter(
  p => p.type && p.type.toLowerCase().trim() === "development"
);

const designProjects = projects.filter(
  p => p.type && p.type.toLowerCase().trim() === "design"
);

  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-[#0b0b0f] text-white overflow-hidden">

        {/* Glow Background */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />

        <div className="relative z-10 px-6 md:px-12 pt-32 pb-20 space-y-28 max-w-7xl mx-auto">

          {/* ================= DEVELOPMENT PROJECTS ================= */}
          <section>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              Development Projects
            </motion.h1>

            <div className="grid md:grid-cols-3 gap-12">
              {devProjects.length > 0 ? (
                devProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Tilt
                      glareEnable
                      glareMaxOpacity={0.2}
                      tiltMaxAngleX={12}
                      tiltMaxAngleY={12}
                      scale={1.04}
                      className="rounded-2xl"
                    >
                      <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                        <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 h-full">

                          {project.image && (
                            <img
                              src={`http://localhost:5000/uploads/${project.image}`}
                              alt={project.title}
                              className="w-full h-48 object-cover rounded-xl mb-5"
                            />
                          )}

                          <h3 className="text-xl font-semibold mb-3">
                            {project.title}
                          </h3>

                          <p className="text-gray-400 mb-6">
                            {project.description}
                          </p>

                          <div className="flex gap-6">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 transition"
                              >
                                GitHub →
                              </a>
                            )}

                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="text-purple-400 hover:text-purple-300 transition"
                              >
                                Live →
                              </a>
                            )}
                          </div>

                        </div>
                      </div>
                    </Tilt>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-3">
                  No development projects yet.
                </p>
              )}
            </div>
          </section>


          {/* ================= GRAPHIC DESIGN WORKS ================= */}
<section>
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-4xl md:text-5xl font-bold mb-20 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
  >
    Graphic Design Works
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
    {designProjects.length > 0 ? (
      designProjects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div className="relative rounded-2xl p-[1px]">

            {/* Neon Border Glow */}
            <div className="
              absolute -inset-1 rounded-2xl
              bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
              blur-xl opacity-0
              group-hover:opacity-60
              transition duration-700
            "></div>

            {/* Card Container */}
            <div className="
              relative bg-[#0b0b0f]
              rounded-2xl overflow-hidden
              transition duration-500
              group-hover:-translate-y-3
            ">

              {/* Image */}
              {project.image && (
                <img
                  src={`http://localhost:5000/uploads/${project.image}`}
                  alt={project.title}
                  className="
                    w-full h-auto
                    transition duration-700 ease-out
                    group-hover:scale-105
                  "
                />
              )}

              {/* Title Outside Image */}
              <div className="p-6">
                <h3 className="
                  text-lg font-semibold
                  tracking-wide
                  text-white
                  group-hover:text-transparent
                  group-hover:bg-gradient-to-r
                  group-hover:from-cyan-400
                  group-hover:to-pink-400
                  group-hover:bg-clip-text
                  transition duration-500
                ">
                  {project.title}
                </h3>
              </div>

            </div>
          </div>
        </motion.div>
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-4">
        No design works yet.
      </p>
    )}
  </div>
</section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Projects;