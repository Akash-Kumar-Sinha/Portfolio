import useRoutes from "../../../utils/Hooks/useRoutes";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = ({
  handleClick,
}: {
  handleClick: (label: string) => void;
}) => {
  const routes = useRoutes();
  return (
    <div className="-mt-8 hidden fixed lg:block h-full">
      <div className="flex h-full items-center gap-12">
        <nav>
          <ul className="flex flex-col gap-2 cursor-pointer">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                label={item.label}
                icon={item.icon}
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
