import { useEffect, useState } from "react";
import API from "../../api";

function ProjectsSection() {
  const [projects, setProjects] = useState([]);

  // ===== DEVELOPMENT STATES =====
  const [devTitle, setDevTitle] = useState("");
  const [devDescription, setDevDescription] = useState("");
  const [devGithub, setDevGithub] = useState("");
  const [devLive, setDevLive] = useState("");
  const [devImage, setDevImage] = useState(null);

  // ===== DESIGN STATES =====
  const [designTitle, setDesignTitle] = useState("");
  const [designImage, setDesignImage] = useState(null);

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

  // ===========================
  // DEVELOPMENT CREATE
  // ===========================
  const handleDevCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", devTitle);
    formData.append("description", devDescription);
    formData.append("github", devGithub);
    formData.append("live", devLive);
    formData.append("type", "development"); // ✅ FIXED
    if (devImage) formData.append("image", devImage);

    await API.post("/projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setDevTitle("");
    setDevDescription("");
    setDevGithub("");
    setDevLive("");
    setDevImage(null);

    fetchProjects();
  };

  // ===========================
  // DESIGN CREATE
  // ===========================
  const handleDesignCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", designTitle);
    formData.append("type", "design"); // ✅ FIXED
    if (designImage) formData.append("image", designImage);

    await API.post("/projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setDesignTitle("");
    setDesignImage(null);

    fetchProjects();
  };

  const handleDelete = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  // ✅ FILTERING BASED ON type
 const devProjects = projects;
const designProjects = [];

  return (
    <div className="space-y-16">

      {/* ================= DEVELOPMENT FORM ================= */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-semibold">Development Projects</h2>

        <form onSubmit={handleDevCreate} className="space-y-4">

          <input
            className="w-full bg-black/40 p-3 rounded"
            placeholder="Title"
            value={devTitle}
            onChange={(e) => setDevTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full bg-black/40 p-3 rounded"
            placeholder="Description"
            value={devDescription}
            onChange={(e) => setDevDescription(e.target.value)}
            required
          />

          <input
            className="w-full bg-black/40 p-3 rounded"
            placeholder="GitHub Link"
            value={devGithub}
            onChange={(e) => setDevGithub(e.target.value)}
          />

          <input
            className="w-full bg-black/40 p-3 rounded"
            placeholder="Live Link"
            value={devLive}
            onChange={(e) => setDevLive(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setDevImage(e.target.files[0])}
          />

          <button className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-semibold">
            Add Development Project
          </button>
        </form>
      </div>


      {/* ================= DESIGN FORM ================= */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-semibold">Graphic Design Works</h2>

        <form onSubmit={handleDesignCreate} className="space-y-4">

          <input
            className="w-full bg-black/40 p-3 rounded"
            placeholder="Design Title"
            value={designTitle}
            onChange={(e) => setDesignTitle(e.target.value)}
            required
          />

          <input
            type="file"
            onChange={(e) => setDesignImage(e.target.files[0])}
            required
          />

          <button className="bg-purple-500 text-black px-6 py-3 rounded-xl font-semibold">
            Add Design Work
          </button>
        </form>
      </div>


      {/* ================= LIST SECTION ================= */}
      <div className="space-y-10">

        {/* Development List */}
        <div>
          <h3 className="text-xl mb-6">All Development Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {devProjects.map((p) => (
              <div key={p._id} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="font-semibold">{p.title}</p>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-400 mt-3 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Design List */}
        <div>
          <h3 className="text-xl mb-6">All Graphic Designs</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {designProjects.map((p) => (
              <div key={p._id} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="font-semibold">{p.title}</p>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-400 mt-3 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default ProjectsSection;