import useRoutes from "../../../utils/Hooks/useRoutes";
import { Path } from "../../../utils/types";
import DesktopItem from "./DesktopItem";


const DesktopSidebar = ({
  handleClick,
  pathName,
}: {
  handleClick: (label: string) => void;
  pathName: Path; 
}) => {
  const routes = useRoutes();
  return (
    <div className="-mt-8 hidden fixed lg:block h-full p-6">
      <div className="flex h-full items-center justify-start">
        <nav>
          <ul className="flex flex-col gap-4 cursor-pointer">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                pathName={pathName}  
                handleClick={() => handleClick(item.label)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
