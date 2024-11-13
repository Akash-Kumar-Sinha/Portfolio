import { useMemo } from "react";
import { FaLightbulb } from "react-icons/fa";
import { GrHomeOption } from "react-icons/gr";
import { CiLink } from "react-icons/ci";
import { PiProjectorScreen } from "react-icons/pi";

const useRoutes = () => {

  const routes = useMemo(
    () => [
      {
        label: "Home",
        icon: GrHomeOption,
      },
      {
        label: "Projects",
        icon: PiProjectorScreen,
      },
      {
        label: "Skills",
        icon: FaLightbulb,
      },
      {
        label: "Links",
        icon: CiLink,
      }
    ],
    []
  );
  return routes;
};

export default useRoutes;
