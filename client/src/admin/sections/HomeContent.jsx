import { useState, useEffect } from "react";
import API from "../../api";

function HomeContentSection() {
  const [home, setHome] = useState({
    hero: {
      name: "",
      identity: "",
      tagline: "",
      description: "",
    },
  });

  const [resume, setResume] = useState(null);
  const [currentResume, setCurrentResume] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHome();
    fetchResume();
  }, []);

  // 🔹 Fetch Home Content
  const fetchHome = async () => {
    try {
      const res = await API.get("/home/content");
      if (res.data) setHome(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load home content ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch Resume
  const fetchResume = async () => {
    try {
      const res = await API.get("/home/resume");
      setCurrentResume(res.data?.resume);
    } catch (err) {
      console.error(err);
      setError("Failed to load resume ❌");
    }
  };

  // 🔹 Save Home Content
  const handleSaveHome = async () => {
    try {
      await API.put("/home/content", {
        data: JSON.stringify(home),
      });
      alert("Home Content Updated 🚀");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  // 🔹 Upload Resume
  const handleResumeUpload = async (e) => {
    e.preventDefault();

    if (!resume) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      await API.post("/home/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Resume Uploaded Successfully ✅");
      fetchResume();
      setResume(null);
    } catch (err) {
      console.error(err);
      alert("Upload Failed ❌");
    } finally {
      setUploading(false);
    }
  };

  // 🔄 Loading UI
  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div className="space-y-16 max-w-3xl">

      {/* ERROR */}
      {error && (
        <div className="text-red-400 bg-red-500/10 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* ================= RESUME UPLOAD ================= */}
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4">

        <h2 className="text-2xl font-semibold">
          Upload Latest Resume
        </h2>

        {currentResume && (
          <p className="text-green-400 text-sm">
            Current Resume: {currentResume}
          </p>
        )}

        <form onSubmit={handleResumeUpload} className="space-y-4">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="bg-black/40 border border-white/10 p-3 w-full rounded"
            required
          />

          <button
            type="submit"
            disabled={uploading}
            className="bg-purple-500 hover:bg-purple-400 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default HomeContentSection;