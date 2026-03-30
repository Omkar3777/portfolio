import { useState } from "react";
import HomeContentSection from "./sections/HomeContent";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import AchievementsSection from "./sections/AchievementsSection";
import SocialSection from "./sections/SocialUpdatesSection";
import ContactsSection from "./sections/ContactsSection";


function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10 text-cyan-400">
        Admin Dashboard
      </h1>

      <div className="flex gap-6 mb-10">
        <button onClick={() => setActiveTab("home")}>Home CMS</button>
        <button onClick={() => setActiveTab("projects")}>Projects</button>
        <button onClick={() => setActiveTab("skills")}>Skills</button>
        <button onClick={() => setActiveTab("achievements")}>Achievements</button>
        <button onClick={() => setActiveTab("social")}>Social Updates</button>
        <button onClick={() => setActiveTab("contacts")}>Contacts</button>
      </div>

      {activeTab === "home" && <HomeContentSection />}
      {activeTab === "projects" && <ProjectsSection />}
      {activeTab === "skills" && <SkillsSection />}
      {activeTab === "contacts" && <ContactsSection />}
      {activeTab === "achievements" && <AchievementsSection />}
      {activeTab === "social" && <SocialSection />}

    </div>
  );
}

export default Dashboard;