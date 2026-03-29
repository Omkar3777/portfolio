import { useEffect, useState } from "react";
import API from "../../api";

function SocialSection() {
  const [items, setItems] = useState([]);
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/social");
    setItems(res.data);
  };

  const resetForm = () => {
    setPlatform("");
    setLink("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.put(`/social/${editingId}`, { platform, link });
    } else {
      await API.post("/social", { platform, link });
    }

    resetForm();
    fetchData();
  };

  const handleEdit = (item) => {
    setPlatform(item.platform);
    setLink(item.link);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/social/${id}`);
    fetchData();
  };

  return (
    <div>
      <div className="bg-white/5 p-8 rounded-2xl mb-10">
        <h2 className="text-2xl mb-4">
          {editingId ? "Edit Social Link" : "Add Social Link"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Platform (LinkedIn / YouTube)"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="bg-black/40 px-4 py-3 rounded-lg"
            required
          />

          <input
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-black/40 px-4 py-3 rounded-lg"
            required
          />

          <button className="bg-cyan-500 px-6 py-3 rounded-xl">
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white/5 p-6 rounded-xl">
            <h3>{item.platform}</h3>
            <a href={item.link} target="_blank" rel="noreferrer" className="text-cyan-400">
              Visit
            </a>

            <div className="flex gap-4 mt-4">
              <button onClick={() => handleEdit(item)} className="bg-yellow-500/20 px-4 py-2 rounded-lg">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="bg-red-500/20 px-4 py-2 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialSection;