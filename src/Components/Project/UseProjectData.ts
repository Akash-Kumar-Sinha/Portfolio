import { useMemo } from "react";
import { FaLightbulb } from "react-icons/fa";
import { GrHomeOption } from "react-icons/gr";
import { CiLink } from "react-icons/ci";
import { PiProjectorScreen } from "react-icons/pi";

const UseProjectData = () => {

  const ProjectData = useMemo(
    () => [
      {
        label: "Chat",
        icon: GrHomeOption,
        imgLink: "#",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus",
      },
      {
        label: "Projects",
        icon: PiProjectorScreen,
        imgLink: "#",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus",

      },
      {
        label: "Skills",
        icon: FaLightbulb,
        imgLink: "#",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus",

      },
      {
        label: "Links",
        icon: CiLink,
        imgLink: "#",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus",

      },
    ],
    []
  );
  return ProjectData;
};

export default UseProjectData;
