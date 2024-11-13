import { useMemo, useState } from "react";
import DesktopSidebar from "../Components/SideBar/DesktopSidebar/DesktopSidebar";
import Header from "../Components/Header/Header";
import Intro from "../Components/Intro";
import Projects from "../Components/Project/Projects ";
import Skills from "../Components/Skills/Skills";
import Link from "../Components/Links/Link";

enum Path {
  HOME,
  PROJECTS,
  SKILLS,
  LINKS,
}

const Home = () => {
  const [pathName, setPathName] = useState<Path>(Path.HOME);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useMemo(
    () => () => {
      setMenuOpen(!menuOpen);
    },
    [menuOpen]
  );

  const handleClick = (label: string) => {
    switch (label) {
      case "Home":
        setPathName(Path.HOME);
        setMenuOpen(false);
        break;
      case "Projects":
        setPathName(Path.PROJECTS);
        setMenuOpen(false);
        break;
      case "Skills":
        setPathName(Path.SKILLS);
        setMenuOpen(false);
        break;
      case "Links":
        setPathName(Path.LINKS);
        setMenuOpen(false);
        break;
      default:
        setPathName(Path.HOME);
        setMenuOpen(false);
    }
  };

  return (
    <div className="h-full flex flex-col pt-[72px] gap-4 overflow-auto">
      <Header
        handleClick={handleClick}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
      />
      <div className="flex flex-1 relative gap-4 mb-2">
        <DesktopSidebar handleClick={handleClick} />

        <div className="bg-zinc-900 lg:ml-32 w-full h-full overflow-auto mx-2 mb-2 flex flex-col lg:flex-row justify-center items-center rounded-xl">
          {pathName === Path.HOME && <Intro />}

          {pathName === Path.PROJECTS && <Projects />}
          {pathName === Path.SKILLS && <Skills />}
          {pathName === Path.LINKS && <Link />}
        </div>
      </div>
    </div>
  );
};

export default Home;
