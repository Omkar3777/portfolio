import { useEffect, useState } from "react";
import API from "../../api";

function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);

  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Intermediate");

  const [toolName, setToolName] = useState("");
  const [toolIcon, setToolIcon] = useState(null);

  useEffect(() => {
    fetchSkills();
    fetchTools();
  }, []);

  // ================= FETCH =================
  const fetchSkills = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  const fetchTools = async () => {
    const res = await API.get("/tools");
    setTools(res.data);
  };

  // ================= ADD SKILL =================
  const handleAddSkill = async (e) => {
    e.preventDefault();

    await API.post("/skills", {
      name: skillName,
      level: skillLevel,
    });

    setSkillName("");
    setSkillLevel("Intermediate");
    fetchSkills();
  };

  // ================= ADD TOOL =================
const handleAddTool = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("name", toolName);
    if (toolIcon) formData.append("icon", toolIcon);

    await API.post("/tools", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setToolName("");
    setToolIcon(null);
    fetchTools();

  } catch (err) {
    console.error(err);
    alert("Tool upload failed");
  }
};

  // ================= DELETE =================
  const handleDeleteSkill = async (id) => {
    await API.delete(`/skills/${id}`);
    fetchSkills();
  };

  const handleDeleteTool = async (id) => {
    await API.delete(`/tools/${id}`);
    fetchTools();
  };

  return (
    <div className="space-y-16">

      {/* ================= SKILLS ================= */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-semibold">Skills</h2>

        <form onSubmit={handleAddSkill} className="space-y-4">
          <input
            className="w-full bg-black/40 p-3 rounded border border-white/10"
            placeholder="Skill Name"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />

          <select
            className="w-full bg-black/40 p-3 rounded border border-white/10"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>

          <button className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-semibold">
            Add Skill
          </button>
        </form>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white/5 p-6 rounded-xl border border-white/10 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{skill.name}</p>
                <p className="text-gray-400 text-sm">{skill.level}</p>
              </div>

              <button
                onClick={() => handleDeleteSkill(skill._id)}
                className="text-red-400 text-sm hover:text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= TOOLS ================= */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-semibold">Tools I Use</h2>

        <form onSubmit={handleAddTool} className="space-y-4">
          <input
            className="w-full bg-black/40 p-3 rounded border border-white/10"
            placeholder="Tool Name"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            required
          />

          <input
            type="file"
            onChange={(e) => setToolIcon(e.target.files[0])}
          />

          <button className="bg-purple-500 text-black px-6 py-3 rounded-xl font-semibold">
            Add Tool
          </button>
        </form>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {tools.map((tool) => (
            <div
              key={tool._id}
              className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center text-center"
            >
              {tool.icon && (
                <img
                  src={`http://localhost:5000/uploads/${tool.icon}`}
                  alt={tool.name}
                  className="w-12 h-12 mb-3 object-contain"
                />
              )}

              <p className="font-semibold">{tool.name}</p>

              <button
                onClick={() => handleDeleteTool(tool._id)}
                className="text-red-400 text-sm mt-3 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default SkillsSection;