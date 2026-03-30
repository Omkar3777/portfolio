import { useState } from "react";

import HomeContentSection from "./sections/HomeContent";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import AchievementsSection from "./sections/AchievementsSection";
import SocialSection from "./sections/SocialUpdatesSection";
import ContactsSection from "./sections/ContactsSection";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home CMS" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "social", label: "Social Updates" },
    { id: "contacts", label: "Contacts" },
  ];

  const renderContent = () => {
    try {
      switch (activeTab) {
        case "home":
          return <HomeContentSection />;
        case "projects":
          return <ProjectsSection />;
        case "skills":
          return <SkillsSection />;
        case "achievements":
          return <AchievementsSection />;
        case "social":
          return <SocialSection />;
        case "contacts":
          return <ContactsSection />;
        default:
          return <p>Select a section</p>;
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
      return (
        <div className="text-red-400">
          Something went wrong in this section ⚠️
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white p-6 md:p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {/* 🔐 Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("isAuth");
            window.location.href = "/";
          }}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-red-500/30 transition"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
              ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-black shadow-lg"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl min-h-[300px]">
        {renderContent()}
      </div>

    </div>
  );
}

export default Dashboard;