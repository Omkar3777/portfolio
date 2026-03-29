import { useEffect, useState } from "react";
import API from "../../api";

function AchievementsSection() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/achievements");
    setItems(res.data);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.put(`/achievements/${editingId}`, { title, description });
    } else {
      await API.post("/achievements", { title, description });
    }

    resetForm();
    fetchData();
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/achievements/${id}`);
    fetchData();
  };

  return (
    <div>
      <div className="bg-white/5 p-8 rounded-2xl mb-10">
        <h2 className="text-2xl mb-4">
          {editingId ? "Edit Achievement" : "Add Achievement"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black/40 px-4 py-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>

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

export default AchievementsSection;