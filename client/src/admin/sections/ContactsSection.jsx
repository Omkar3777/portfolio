import { useEffect, useState } from "react";
import API from "../../api";

function ContactsSection() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await API.get("/contact");
    setContacts(res.data);
  };

  const markAsRead = async (id) => {
    await API.put(`/contact/${id}`);
    fetchContacts();
  };

  const handleDelete = async (id) => {
    await API.delete(`/contact/${id}`);
    fetchContacts();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contact Messages</h2>

      {contacts.map((contact) => (
        <div key={contact._id} className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold">
            {contact.name} ({contact.email})
          </h3>

          <p className="text-gray-400 mt-2">{contact.message}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => markAsRead(contact._id)}
              className="bg-cyan-500 px-4 py-2 rounded-lg text-black"
            >
              Mark Read
            </button>

            <button
              onClick={() => handleDelete(contact._id)}
              className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}

export default ContactsSection;