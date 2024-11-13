import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import { PORTFOLIO_TOKEN } from "../utils/types";
import AboutContent from "../Components/Admin/AboutContent";
import ProjectsContent from "../Components/Admin/ProjectsContent";
import SkillsContent from "../Components/Admin/SkillsContent";
import LinksContent from "../Components/Admin/LinksContent";

enum AdminSettingTabs {
  PROJECTS,
  SKILLS,
  LINKS,
  ABOUT
}

const AdminSetting = () => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<AdminSettingTabs>(AdminSettingTabs.PROJECTS);

  const logOut = () => {
    localStorage.removeItem(PORTFOLIO_TOKEN);
    navigate("/");
  };

  const handleTab = (tab: AdminSettingTabs) => {
    setTabs(tab);
  };

  return (
    <div className="h-full flex flex-col items-center text-white p-3 space-y-3 overflow-auto">
      <div className="w-full flex justify-between bg-zinc-800 p-2 rounded-lg shadow-lg">
        <div
          onClick={() => handleTab(AdminSettingTabs.PROJECTS)}
          className={`cursor-pointer text-lg px-4 py-2 rounded-md transition duration-200 ${
            tabs === AdminSettingTabs.PROJECTS
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-500"
          }`}
        >
          Projects
        </div>
        <div
          onClick={() => handleTab(AdminSettingTabs.SKILLS)}
          className={`cursor-pointer text-lg px-4 py-2 rounded-md transition duration-200 ${
            tabs === AdminSettingTabs.SKILLS
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-500"
          }`}
        >
          Skills
        </div>
        <div
          onClick={() => handleTab(AdminSettingTabs.LINKS)}
          className={`cursor-pointer text-lg px-4 py-2 rounded-md transition duration-200 ${
            tabs === AdminSettingTabs.LINKS
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-500"
          }`}
        >
          Links
        </div>
        <div
          onClick={() => handleTab(AdminSettingTabs.ABOUT)}
          className={`cursor-pointer text-lg px-4 py-2 rounded-md transition duration-200 ${
            tabs === AdminSettingTabs.ABOUT
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-500"
          }`}
        >
          About
        </div>

        <button onClick={logOut} className="flex items-center text-lg p-2">
          <CiLogout size={24} />
        </button>
      </div>

      <div className="w-full h-full mt-6 bg-zinc-900 p-6 rounded-lg shadow-md overflow-auto">
        {tabs === AdminSettingTabs.PROJECTS && <ProjectsContent/>}
        {tabs === AdminSettingTabs.SKILLS && <SkillsContent/>}
        {tabs === AdminSettingTabs.LINKS && <LinksContent/>}
        {tabs === AdminSettingTabs.ABOUT && <AboutContent/>}
      </div>
    </div>
  );
};

export default AdminSetting;
